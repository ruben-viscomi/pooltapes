import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';
import * as path from 'path';

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

  processThumb(id: string, thumb: File): void {
    this.createFolderSafe(`./public/videos/${id}`);
    fs.rename(
      `./public/tmp/${thumb.filename}`,
      `./public/videos/${id}/thumb${path.extname(thumb.originalname)}`,
      (err: any) => {
        if (err) console.log(err);
      }
    );
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

  async convert(id: string, videoFile: File): Promise<void> {
    this.createFolderSafe(`./public/videos/${id}`);
    // const metadata = await this.videoInfo('public/tmp/' + videoFile.filename);
    // const { streams } = metadata;
    // var streamsObj = [];
    // for (let stream of streams) {
    //   let streamObj = { index: stream.index, codecType: stream.codec_type };
    //   if (stream.codec_type === 'video')
    //     Object.assign(streamObj, { width: stream.width, height: stream.height, aspectRatio: stream.display_aspect_ratio, bitrate: stream.bit_rate });
    //   if (stream.codec_type === 'audio')
    //     Object.assign(streamObj, { sampleRate: stream.sample_rate, channelLayout: stream.channel_layout, bitrate: stream.bit_rate });
    //   streamsObj.push(streamObj);
    // }
    // const resolutions = this.calculateResolutions(streamsObj[0].height, streamsObj[0].aspectRatio);
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
      .on('progress', (progress: any) => {
        // TODO: use SSE or Socket.io to send % info
        console.log('Processing: ' + progress.percent + '% done')
      })
      .on('end', (err: any, stdout: any, stderr: any) => {
        if (err) console.log(err);
        console.log('Finished processing!' /*, err, stdout, stderr*/)
        fs.unlink(`./public/tmp/${videoFile.filename}`, (err: any) => {
          if (err) console.log(err); return;
          console.log(`deleted file: /public/tmp/${videoFile.filename}`);
        });
      })
      .run();
  }

  private videoInfo(videoPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err: any, metadata: any) => {
        if (err) reject(err);
        else resolve(metadata);
      });
    });
  }

  private calculateResolutions(height: number, aspectRatio: string, renditions: number[] = [240, 360, 480, 720, 1080, 1440, 2160]): any {
    const resolutions = [];
    const [num, den] = aspectRatio.split(':')
    const heightToWidthRatio: number = Number(num)/Number(den);
    for (let rendition of renditions) {
      if (rendition >= height)
        return resolutions;
      resolutions.push({ width: Math.trunc(rendition * heightToWidthRatio), height: rendition });
    }
    return resolutions;
  }

  private createFolderSafe(path: string): void {
    if (!fs.existsSync(path))
      fs.mkdirSync(path);
  }

}
