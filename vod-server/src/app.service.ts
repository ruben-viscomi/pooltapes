import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';
import * as path from 'path';

import { File } from './types/file.type';

import { HlsConverter } from './hls-converter';

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

  async convert(id: string, videoFile: File): Promise<void> {
    // this.createFolderSafe(`./public/videos/${id}`);
    // const videoPath: string = await this.splitVideo(id, videoFile);
    // console.log('video_only saved in: ' + videoPath);
    // const videoHlsPath: string = await this.convertVideoToHls(id, videoPath);
    // console.log('video.m3u8 daved in: ' + videoHlsPath);
    const converter: HlsConverter = new HlsConverter(id, 'public/tmp/' + videoFile.filename);
    await converter.convert();

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

    // const command = ffmpeg('public/tmp/' + videoFile.filename, { timeout: 432000 })
    //   .addOptions([
    //     // '-vcodec libx264',
    //     // '-acodec aac',
    //     '-profile:v baseline',
    //     '-level 3.0',
    //     // '-map 0:v',
    //     // '-map 0:a:0',
    //     '-master_pl_name master.m3u8',
    //     '-hls_playlist_type vod',
    //     '-hls_flags independent_segments',
    //     '-hls_segment_type mpegts',
    //     '-start_number 0',
    //     '-hls_time 2',
    //     '-hls_list_size 0',
    //     '-f hls'
    //   ])
    //   .output(`public/videos/${id}/video.m3u8`)
    //   .on('start', (cmd: any) => console.log('cmd: ' + cmd))
    //   .on('progress', (progress: any) => {
    //     // TODO: use SSE or Socket.io to send % info
    //     console.log('Processing: ' + progress.percent + '% done')
    //   })
    //   .on('end', (err: any, stdout: any, stderr: any) => {
    //     if (err) console.log(err);
    //     console.log('Finished processing!' /*, err, stdout, stderr*/)
    //     fs.unlink(`./public/tmp/${videoFile.filename}`, (err: any) => {
    //       if (err) console.log(err); return;
    //       console.log(`deleted file: /public/tmp/${videoFile.filename}`);
    //     });
    //   })
    //   .run();
  }

  private splitStreams(videoFile: File, streams: any[]): void {
    streams.forEach((stream: any) => {
    });
  }

  private splitVideo(id: string, videoFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const command = ffmpeg('public/tmp/' + videoFile.filename, { timeout: 432000 })
        .addOptions(['-an', '-sn'])
        .output(`public/videos/${id}/video.mp4`)
        .on('start', (cmd: string) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done'))
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log('Finished processing!');
          resolve(`public/videos/${id}/video.mp4`);
        })
        .run();
    });
  }

  private convertVideoToHls(id: string, videoPath: string): Promise<string> {
    this.createFolderSafe(`./public/videos/${id}/video`);
    return new Promise((resolve, reject) => {
      const command = ffmpeg(videoPath, { timeout: 432000 })
        .addOptions([
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
        .output(`public/videos/${id}/video/video.m3u8`)
        .on('start', (cmd: string) => console.log('cmd: ' + cmd))
        .on('progress', (progress: any) => console.log('Processing: ' + progress.percent + '% done'))
        .on('end', (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log('Finished processing!');
          resolve(`public/videos/${id}/video.m3u8`);
        })
        .run();
    });
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
