import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';

import { createFolderSafe, deleteFileSafe } from '../utils';
import { IConverter } from '../interfaces';
import { Converter } from '../abstract';
import { ConverterDto } from '../dto';
import { ISubtitleInfo } from '../types';

export class SubtitleConverter extends Converter<ISubtitleInfo> implements IConverter {

  constructor(converterDto: ConverterDto) {
    super(converterDto);
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    this.createFolderStructure();
  }

  convert(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const startTime: number = Date.now();

      if (!await this.convertToVTT()) resolve(false);
      if (!await this.writePlaylist()) resolve(false);

      console.log(`CONVERSION_END: audio conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
      resolve(true);
    });
  }

  private convertToVTT(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      ffmpeg(this._filePath, { timeout: 432_000 })
        .addOptions([`-map 0:s:${ this._info.subtitleStreamIndex }`, '-vn', '-an', '-dn'])
        .output(`public/videos/${ this._id }/subtitle/${ this._info.language }/${ this._info.forced ? 'forced' : 'raw' }/subtitle.vtt`)
        .on('start', (cmd: any) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done')) // ← TODO: use SSE or Socket.io to send % info
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            resolve(false);
          }
          console.log(`Finished converting subtitle (${ this._info.language }, forced: ${ this._info.forced }) with id: ${ this._id }`)
          resolve(true);
        })
        .run();
    });
  }

  private writePlaylist(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      fs.writeFile(
        `./public/videos/${ this._id }/subtitle/${ this._info.language }/${ this._info.forced ? 'forced' : 'raw' }/subtitle.m3u8`,
        `#EXTM3U\n#EXT-X-TARGETDURATION:${ Math.trunc(this._info.duration) }\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:1\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXTINF:${ this._info.duration.toFixed(2) },\nsubtitle.vtt\n#EXT-X-ENDLIST`,
        (err: any) => {
          if (err) resolve(false);
          resolve(true);
        }
      );
    });
  }

  private createFolderStructure(): void {
    createFolderSafe(`./public/videos/${ this._id }`);
    createFolderSafe(`./public/videos/${ this._id }/subtitle`);
    createFolderSafe(`./public/videos/${ this._id }/subtitle/${ this._info.language }`);
    createFolderSafe(`./public/videos/${ this._id }/subtitle/${ this._info.language }/${ this._info.forced ? 'forced' : 'raw' }`);
  }

}
