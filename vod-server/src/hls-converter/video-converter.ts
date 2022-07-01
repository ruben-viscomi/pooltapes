import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

import { createFolderSafe, deleteFileSafe } from './utils';

import { IVideoRenditionInfo } from './types/video-rendition-info.interface';

export class VideoConverter {

  private _mediaId: string;
  private _filePath: string;
  private _renditionsInfo: IVideoRenditionInfo[];
  private _streamIndex: number;

  constructor(mediaId: string, filePath: string, renditionsInfo: IVideoRenditionInfo[], streamIndex: number) {
    this._mediaId = mediaId;
    this._filePath = filePath;
    this._renditionsInfo = renditionsInfo;
    this._streamIndex = streamIndex;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    this.createFolderStructure();
  }

  convert(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const startTime: number = Date.now();

      if (!await this.convertToMpeg()) reject(false);

      for (let i: number = 0; i < this._renditionsInfo.length; i++)
        if (!await this.convertOne(this._renditionsInfo[i])) reject(false);

      deleteFileSafe(`./public/videos/${ this._mediaId }/video/vid.mp4`);

      console.log(`CONVERSION_END: video conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
      resolve(true);
    });
  }

  private convertToMpeg(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      ffmpeg(this._filePath, { timeout: 432_000 })
        .videoCodec('libx264')
        .addOptions([`-map 0:v:${ this._streamIndex }`, '-an', '-sn', '-dn'])
        .output(`public/videos/${ this._mediaId }/video/vid.mp4`)
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
          console.log(`Finished converting video_only with id: ${ this._mediaId }` /*, err, stdout, stderr*/)
          resolve(true);
        })
        .run();
    });
  }

  private convertOne(rendition: IVideoRenditionInfo): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      ffmpeg(`public/videos/${ this._mediaId }/video/vid.mp4`, { timeout: 432_000 })
        .size(`${ rendition.width }x${ rendition.height }`)
        .videoCodec('libx264')
        .videoBitrate(rendition.bitRate / 1000) // NOTE: accepts kbps
        .addOptions([
          '-an', '-sn', '-dn',
          '-profile:v baseline',
          '-level 3.0',
          '-master_pl_name master.m3u8',
          '-hls_playlist_type vod',
          '-hls_flags independent_segments',
          '-hls_segment_type mpegts',
          '-start_number 0',
          '-hls_time 2',
          '-hls_list_size 0',
          '-f hls'
        ])
        // .output(`public/videos/${ this._mediaId }/vid_renditions/${ rendition.label }/${ rendition.label }.mp4`)
        .output(`public/videos/${ this._mediaId }/video/${ rendition.label }/video.m3u8`)
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
          console.log(`Finished processing: { id: ${ this._mediaId }, rendition_type: video, rendition: ${ rendition.label } }` /*, err, stdout, stderr*/)
          resolve(true);
        })
        .run();
    });
  }

  private createFolderStructure(): void {
    createFolderSafe(`./public/videos/${ this._mediaId }`);
    createFolderSafe(`./public/videos/${ this._mediaId }/video`);
    this._renditionsInfo.forEach((rendition: IVideoRenditionInfo) => {
      createFolderSafe(`./public/videos/${ this._mediaId }/video/${ rendition.label }`);
    });
  }

}
