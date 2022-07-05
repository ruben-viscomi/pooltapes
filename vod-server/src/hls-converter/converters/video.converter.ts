import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

import { createFolderSafe, deleteFileSafe } from '../utils';
import { IVideoRenditionInfo } from '../types';
import { RenditionsConverterDto } from '../dto';
import { RenditionsConverter } from '../abstract';
import { IConverter } from '../interfaces';

export class VideoConverter extends RenditionsConverter<IVideoRenditionInfo> implements IConverter {

  constructor(renditionsConverterDto: RenditionsConverterDto) {
    super(renditionsConverterDto);
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    this.createFolderStructure();
  }

  convert(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const startTime: number = Date.now();

      if (!await this.convertToMpeg()) resolve(false);

      for (let i: number = 0; i < this._info.length; i++)
        if (!await this.convertOne(this._info[i])) resolve(false);

      deleteFileSafe(`./public/videos/${ this._id }/video/vid.mp4`);

      console.log(`CONVERSION_END: video conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
      resolve(true);
    });
  }

  private convertToMpeg(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      ffmpeg(this._filePath, { timeout: 432_000 })
        .videoCodec('libx264')
        .addOptions([`-map 0:v:${ this._streamIndex }`, '-an', '-sn', '-dn'])
        .output(`public/videos/${ this._id }/video/vid.mp4`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done')) // ← TODO: use SSE or Socket.io to send % info
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            reject(false);
          }
          console.log(`Finished converting video_only with id: ${ this._id }`)
          resolve(true);
        })
        .run();
    });
  }

  private convertOne(rendition: IVideoRenditionInfo): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      ffmpeg(`public/videos/${ this._id }/video/vid.mp4`, { timeout: 432_000 })
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
        .output(`public/videos/${ this._id }/video/${ rendition.label }/video.m3u8`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done')) // ← TODO: use SSE or Socket.io to send % info
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            reject(false);
          }
          console.log(`Finished processing: { id: ${ this._id }, rendition_type: video, rendition: ${ rendition.label } }`)
          resolve(true);
        })
        .run();
    });
  }

  private createFolderStructure(): void {
    createFolderSafe(`./public/videos/${ this._id }`);
    createFolderSafe(`./public/videos/${ this._id }/video`);
    this._info.forEach((rendition: IVideoRenditionInfo) => {
      createFolderSafe(`./public/videos/${ this._id }/video/${ rendition.label }`);
    });
  }

}
