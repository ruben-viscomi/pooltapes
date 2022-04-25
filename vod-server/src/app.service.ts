import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';

import { File } from './types/file.type';

@Injectable()
export class AppService {

  constructor() {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  }

  canHost(): boolean {
    console.log('hosting request');
    return true;
  }

  // convert(id: string, videoFile: File): void {
  //   console.log(videoFile);
  //   const command = ffmpeg('./uploads/' + videoFile.filename)
  //     .outputOptions([
  //         '-codec: copy',
  //         '-hls_time 10',
  //         '-hls_playlist_type vod',
  //         '-hls_segment_filename ~/%03d.ts'
  //     ])
  //     .output(`./uploads/${id}.m3u8`)
  //     .on('progress', function(progress) {
  //         console.log('Processing: ' + progress.percent + '% done')
  //     })
  //     .on('end', function(err, stdout, stderr) {
  //         if (err) console.log(err);
  //         console.log('Finished processing!' /*, err, stdout, stderr*/)
  //     })
  //     .run();
  // }

  convert(id: string, videoFile: File): void {
    fs.mkdirSync(`./public/videos/${id}`)
    const command = ffmpeg('public/tmp/' + videoFile.filename, { timeout: 432000 })
      .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-map 0:v',
        '-map 0:a:0',
        // '-master_pl_name master.m3u8'
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
      ])
      .output(`public/videos/${id}/video.m3u8`)
      .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done')
      })
      .on('end', function(err, stdout, stderr) {
        if (err) console.log(err);
        console.log('Finished processing!' /*, err, stdout, stderr*/)
        fs.unlink(`./public/tmp/${videoFile.filename}`, (err: any) => {
          if (err) console.log(err); return;
          console.log(`deleted file: /public/tmp/${videoFile.filename}`);
        });
      })
      .run();
  }

}
