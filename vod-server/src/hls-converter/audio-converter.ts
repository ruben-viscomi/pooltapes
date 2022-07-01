import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

import { createFolderSafe, deleteFileSafe } from './utils';

import { IAudioRenditionInfo } from './types/audio-rendition-info.interface';

const AUDIO_LAYOUTS: any = {
  2: 'stereo',
  6: 'surround'
}

export class AudioConverter {

  private _mediaId: string;
  private _filePath: string;
  private _renditionsInfo: IAudioRenditionInfo[];
  private _streamIndex: number;

  constructor(mediaId: string, filePath: string, renditionsInfo: IAudioRenditionInfo[], streamIndex: number) {
    this._mediaId = mediaId;
    this._filePath = filePath;
    this._renditionsInfo = renditionsInfo;
    this._streamIndex = streamIndex;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    this.createFolderStructure();
  }

  async convert(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const startTime: number = Date.now();

      if (!await this.convertToAAC()) reject(false);

      for (let i: number = 0; i < this._renditionsInfo.length; i++)
        if (!await this.convertOne(this._renditionsInfo[i])) reject(false);

      deleteFileSafe(`./public/videos/${ this._mediaId }/audio/${ this._renditionsInfo[0].label }/audio.aac`);

      console.log(`CONVERSION_END: audio conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
      resolve(true);
    });
  }

  private convertToAAC(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      ffmpeg(this._filePath, { timeout: 432_000 })
        .audioCodec('aac')
        .addOptions([`-map 0:a:${ this._streamIndex }`, '-vn', '-sn', '-dn'])
        .output(`public/videos/${ this._mediaId }/audio/${ this._renditionsInfo[0].label }/audio.aac`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => {
          // TODO: use SSE or Socket.io to send % info
          console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            reject(false);
          }
          console.log(`Finished converting audio_only (${ this._renditionsInfo[0].label }) with id: ${ this._mediaId }` /*, err, stdout, stderr*/)
          resolve(true);
        })
        .run();
    });
  }

  private convertOne(rendition: IAudioRenditionInfo): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      ffmpeg(`public/videos/${ this._mediaId }/audio/${ rendition.label }/audio.aac`, { timeout: 432_000 })
        .audioCodec('aac')
        .audioBitrate(rendition.bitRate / 1000)
        .addOptions([
          '-vn', '-sn', '-dn',
          '-profile:v baseline',
          '-level 3.0',
          '-hls_playlist_type vod',
          '-hls_flags independent_segments',
          '-hls_segment_type mpegts',
          '-start_number 0',
          '-hls_time 2',
          '-hls_list_size 0',
          '-f hls'
        ])
        .output(`public/videos/${ this._mediaId }/audio/${ rendition.label }/${ AUDIO_LAYOUTS[rendition.channels] }/audio.m3u8`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => {
          // TODO: use SSE or Socket.io to send % info
          console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            reject(false);
          }
          console.log(`Finished processing: { id: ${ this._mediaId }, rendition_type: audio, language: ${ rendition.label }, layout: ${ AUDIO_LAYOUTS[rendition.channels] } }` /*, err, stdout, stderr*/)
          resolve(true);
        })
        .run();
    });
  }

  private createFolderStructure(): void {
    createFolderSafe(`./public/videos/${ this._mediaId }`);
    createFolderSafe(`./public/videos/${ this._mediaId }/audio`);
    this._renditionsInfo.forEach((rendition: IAudioRenditionInfo) => {
      createFolderSafe(`./public/videos/${ this._mediaId }/audio/${ rendition.label }`);
      createFolderSafe(`./public/videos/${ this._mediaId }/audio/${ rendition.label }/${ AUDIO_LAYOUTS[rendition.channels] }`);
    });
  }

}
