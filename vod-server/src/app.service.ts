import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';

import { File } from './types/file.type';

@Injectable()
export class AppService {

  canHost(): boolean {
    console.log('hosting request');
    return true;
  }

  convert(id: string, videoFile: File): void {
    console.log(videoFile);
    // const command = ffmpeg('./uploads/' + videoFile.filename)
    //   .audioCodec('libopus')
    //   .audioBitrate(96)
    //   .outputOptions([
    //       '-codec: copy',
    //       '-hls_time 10',
    //       '-hls_playlist_type vod',
    //       '-hls_base_url http://127.0.0.1:6000/',
    //       '-hls_segment_filename ~/%03d.ts'
    //   ])
    //   .output(`./uploads/${id}.m3u8`)
    //   .on('progress', function(progress) {
    //       console.log('Processing: ' + progress.percent + '% done')
    //   })
    //   .on('end', function(err, stdout, stderr) {
    //       console.log('Finished processing!' /*, err, stdout, stderr*/)
    //   })
    //   .run();
  }

}
