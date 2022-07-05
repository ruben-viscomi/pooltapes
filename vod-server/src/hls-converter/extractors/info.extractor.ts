import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

import { IAudioInfo, IVideoInfo, ISubtitleInfo } from '../types';

export class InfoExtractor {

  private _sourceFilePath: string;

  constructor(sourceFilePath) { this._sourceFilePath = sourceFilePath }

  grabInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      ffmpeg.ffprobe(this._sourceFilePath, (err: any, metadata: any) => {
        if (err) reject(err);

        const { streams } = metadata;
        resolve({
          videoStreams: this.processVideoStreams(streams.filter((meta: any) => meta.codec_type === 'video')),
          audioStreams: this.processAudioStreams(streams.filter((meta: any) => meta.codec_type === 'audio')),
          subtitleStreams: this.processSubtitleStreams(streams.filter((meta: any) => meta.codec_type === 'subtitle'))
        });
      });
    });
  }

  processVideoStreams(videoStreams: any[]): IVideoInfo[] {
    return videoStreams.map(
      (stream: any, index: number) => ({
        type: 'video',
        width: stream.width,
        height: stream.height,
        codec: stream.codec_name,
        videoStreamIndex: index,
        streamIndex: stream.index,
        duration: stream.duration,
        aspectRatio: stream.display_aspect_ratio,
        bitRate: stream.bit_rate
      })
    );
  }

  processAudioStreams(audioStreams: any[]): IAudioInfo[] {
    return audioStreams.map(
      (stream: any, index: number) => ({
        type: 'audio',
        channels: stream.channels,
        codec: stream.codec_name,
        audioStreamIndex: index,
        streamIndex: stream.index,
        language: stream.tags.language,
        bitRate: stream.bit_rate,
        sampleRate: stream.sample_rate,
        duration: stream.duration
      })
    );
  }

  processSubtitleStreams(subtitleStreams: any[]): ISubtitleInfo[] {
    const subs: ISubtitleInfo[] = [];
    for (let i: number = 0; i < subtitleStreams.length; i++)
      if (subtitleStreams[i].codec_name === 'subrip')
        subs.push({
          type: 'subtitle',
          codec: subtitleStreams[i].codec_name,
          subtitleStreamIndex: i,
          streamIndex: subtitleStreams[i].index,
          language: subtitleStreams[i].tags.language,
          forced: !!subtitleStreams[i].disposition.forced || subtitleStreams[i].tags.title.toLowerCase().includes('forced'),
          bitRate: subtitleStreams[i].bit_rate,
          duration: subtitleStreams[i].duration
        });
    return subs;
  }

}
