import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

import { createFolderSafe, deleteFileSafe } from '../utils';
import { RenditionsConverter } from '../abstract';
import { IConverter } from '../interfaces';
import { RenditionsConverterDto } from '../dto';
import { IAudioRenditionInfo } from '../types';

const AUDIO_LAYOUTS: any = { 2: 'stereo', 6: 'surround' };

export class AudioConverter extends RenditionsConverter<IAudioRenditionInfo> implements IConverter {

  constructor(renditionsConverterDto: RenditionsConverterDto) {
    super(renditionsConverterDto);
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    this.createFolderStructure();
  }

  convert(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const startTime: number = Date.now();

      if (!await this.convertToAAC()) resolve(false);
      for (let i: number = 0; i < this._info.length; i++)
        if (!await this.convertOne(this._info[i])) resolve(false);

      deleteFileSafe(`./public/videos/${ this._id }/audio/${ this._info[0].label }/audio.aac`);

      console.log(`CONVERSION_END: audio conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
      resolve(true);
    });
  }

  private convertToAAC(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      ffmpeg(this._filePath, { timeout: 432_000 })
        .audioCodec('aac')
        .addOptions([`-map 0:a:${ this._streamIndex }`, '-vn', '-sn', '-dn'])
        .output(`public/videos/${ this._id }/audio/${ this._info[0].label }/audio.aac`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done')) // ← TODO: use SSE or Socket.io to send % info
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            resolve(false);
          }
          console.log(`Finished converting audio_only (${ this._info[0].label }) with id: ${ this._id }`)
          resolve(true);
        })
        .run();
    });
  }

  private convertOne(rendition: IAudioRenditionInfo): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      ffmpeg(`public/videos/${ this._id }/audio/${ rendition.label }/audio.aac`, { timeout: 432_000 })
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
        .output(`public/videos/${ this._id }/audio/${ rendition.label }/${ AUDIO_LAYOUTS[rendition.channels] }/audio.m3u8`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done')) // ← TODO: use SSE or Socket.io to send % info
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            resolve(false);
          }
          console.log(`Finished processing: { id: ${ this._id }, rendition_type: audio, language: ${ rendition.label }, layout: ${ AUDIO_LAYOUTS[rendition.channels] } }`)
          resolve(true);
        })
        .run();
    });
  }

  private createFolderStructure(): void {
    createFolderSafe(`./public/videos/${ this._id }`);
    createFolderSafe(`./public/videos/${ this._id }/audio`);
    this._info.forEach((rendition: IAudioRenditionInfo) => {
      createFolderSafe(`./public/videos/${ this._id }/audio/${ rendition.label }`);
      createFolderSafe(`./public/videos/${ this._id }/audio/${ rendition.label }/${ AUDIO_LAYOUTS[rendition.channels] }`);
    });
  }

}
