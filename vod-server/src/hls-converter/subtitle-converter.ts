import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';


import { createFolderSafe, deleteFileSafe } from './utils';

import { ISubtitleInfo } from './types/subtitle-info.interface';

export class SubtitleConverter {

  private _mediaId: string;
  private _filePath: string;
  private _info: ISubtitleInfo;
  private _streamIndex: number;

  constructor(mediaId: string, filePath: string, renditionsInfo: ISubtitleInfo, streamIndex: number) {
    this._mediaId = mediaId;
    this._filePath = filePath;
    this._info = renditionsInfo;
    this._streamIndex = streamIndex;
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    this.createFolderStructure();
  }

  async convert(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const startTime: number = Date.now();

      if (!await this.convertToVTT()) resolve(false);
      if (!await this.convertToHLS()) resolve(false);

      console.log(`CONVERSION_END: audio conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
      resolve(true);
    });
  }

  private convertToVTT(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      ffmpeg(this._filePath, { timeout: 432_000 })
        .addOptions([`-map 0:s:${ this._streamIndex }`, '-vn', '-an', '-dn'])
        .output(`public/videos/${ this._mediaId }/subtitle/${ this._info.language }/${ this._info.forced ? 'forced' : 'raw' }/subtitle.vtt`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => {
          // TODO: use SSE or Socket.io to send % info
          console.log('Processing: ' + progress.percent + '% done')
        })
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            resolve(false);
          }
          console.log(`Finished converting subtitle (${ this._info.language }, forced: ${ this._info.forced }) with id: ${ this._mediaId }` /*, err, stdout, stderr*/)
          resolve(true);
        })
        .run();
    });
  }

  private convertToHLS(): Promise<boolean> {
    return new Promise<any>((resolve) => {
      fs.writeFile(
        `./public/videos/${ this._mediaId }/subtitle/${ this._info.language }/${ this._info.forced ? 'forced' : 'raw' }/subtitle.m3u8`,
        `#EXTM3U\n#EXT-X-TARGETDURATION:${ Math.trunc(this._info.duration) }\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:1\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXTINF:${ this._info.duration.toFixed(2) },\nsubtitle.vtt\n#EXT-X-ENDLIST`,
        (err: any) => {
          if (err) resolve(false);
          resolve(true);
        }
      );
    });
  }

  private createFolderStructure(): void {
    createFolderSafe(`./public/videos/${ this._mediaId }`);
    createFolderSafe(`./public/videos/${ this._mediaId }/subtitle`);
    createFolderSafe(`./public/videos/${ this._mediaId }/subtitle/${ this._info.language }`);
    createFolderSafe(`./public/videos/${ this._mediaId }/subtitle/${ this._info.language }/${ this._info.forced ? 'forced' : 'raw' }`);
  }

}
