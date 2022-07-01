// import * as ffmpeg from 'fluent-ffmpeg';
// import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';
// import * as path from 'path';

import { InfoExtractor } from './info-extractor';
import { RenditionsInfoGeneratorFactory } from './renditions-info-generator-factory';

import { VideoConverter } from './video-converter';
import { AudioConverter } from './audio-converter';
import { SubtitleConverter } from './subtitle-converter';

import { deleteFileSafe, readFileData } from './utils';

import { IVideoInfo } from './types/video-info.interface';
import { IAudioInfo } from './types/audio-info.interface';
import { ISubtitleInfo } from './types/subtitle-info.interface';
import { IVideoRenditionInfo } from './types/video-rendition-info.interface';
import { IAudioRenditionInfo } from './types/audio-rendition-info.interface';

import { COMMON_RESOLUTIONS } from './data/common-resolutions.data';
import { COMMON_AUDIO } from './data/common-audio.data';
import { COMMON_LANGUAGES } from './data/common-languages.data';

export class HlsConverter {
  private _id: string;
  private _sourceFilePath: string;

  constructor(id: string, sourceFilePath: string) {
    this._id = id;
    this._sourceFilePath = sourceFilePath;
  }

  async convert(): Promise<void> {
    const startTime: number = Date.now();

    const infoExtractor: InfoExtractor = new InfoExtractor(this._sourceFilePath);
    const sourceInfo: any = await infoExtractor.grabInfo();

    const videoStreamInfo: IVideoInfo = sourceInfo.videoStreams[0];
    const generatedVideoInfo: IVideoRenditionInfo[] = RenditionsInfoGeneratorFactory.createForInfo(videoStreamInfo).generate();
    await (new VideoConverter(this._id, this._sourceFilePath, generatedVideoInfo, videoStreamInfo.videoStreamIndex)).convert();
    for (let i: number = 0; i < generatedVideoInfo.length; i++) {
      const masterPL: string = await readFileData(`./public/videos/${ this._id }/video/${ generatedVideoInfo[i].label }/master.m3u8`);
      const startIndex: number = masterPL.search(/avc1\.\w+/);
      const codec: string = masterPL.substr(startIndex, 11);
      generatedVideoInfo[i].codec = codec;
      deleteFileSafe(`./public/videos/${ this._id }/video/${ generatedVideoInfo[i].label }/master.m3u8`);
    }

    const audioStreamsInfo: IAudioInfo[] = sourceInfo.audioStreams;
    var allAudioInfo: IAudioRenditionInfo[] = [];
    for (let i: number = 0; i < audioStreamsInfo.length; i++) {
      const generatedAudioInfo: IAudioRenditionInfo[] = RenditionsInfoGeneratorFactory.createForInfo(audioStreamsInfo[i]).generate();
      allAudioInfo.push(...generatedAudioInfo);
      await (new AudioConverter(this._id, this._sourceFilePath, generatedAudioInfo, audioStreamsInfo[i].audioStreamIndex)).convert();
    }

    const subtitlesInfo: ISubtitleInfo[] = sourceInfo.subtitleStreams;
    for (let i: number = 0; i < subtitlesInfo.length; i++)
      await (new SubtitleConverter(this._id, this._sourceFilePath, subtitlesInfo[i], subtitlesInfo[i].subtitleStreamIndex)).convert();

    deleteFileSafe(this._sourceFilePath);

    await this.generateManifest(generatedVideoInfo, allAudioInfo, subtitlesInfo);

    console.log(`CONVERSION_END: total conversion took ${ (Date.now() - startTime) / 1000 } seconds.`);
  }

  generateManifest(video: IVideoRenditionInfo[], audio: IAudioRenditionInfo[], subs: ISubtitleInfo[]): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      fs.writeFile(
        `./public/videos/${ this._id }/master.m3u8`,
        `#EXTM3U\n${ this.generateSubtitlesManifestInfo(subs) }\n${ this.generateAudioManifestInfo(audio) }\n${ this.generateVideoManifestInfo(video) }`,
        (err: any) => {
          if (err) resolve(false);
          resolve(true);
        }
      );
    });
  }

  generateSubtitlesManifestInfo(subtitles: ISubtitleInfo[]): string {
    var str: string = '';
    for (let i: number = 0; i < subtitles.length; i++)
      str += `\n#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="${ COMMON_LANGUAGES[subtitles[i].language] }",DEFAULT=NO,AUTOSELECT=${ i === 0 ? 'YES' : 'NO' },FORCED=${ subtitles[i].forced ? 'YES' : 'NO' },LANGUAGE="${ subtitles[i].language }",URI="subtitle/${ subtitles[i].language }/${ subtitles[i].forced ? 'forced' : 'raw' }/subtitle.m3u8"`;
    return str;
  }

  generateAudioManifestInfo(audio: IAudioRenditionInfo[]): string {
    var str: string = '';
    const stereoTracks: IAudioRenditionInfo[] = audio.filter((track: IAudioRenditionInfo) => track.channels === 2);
    for (let i: number = 0; i < stereoTracks.length; i++)
      str += `\n#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="stereo",LANGUAGE="${ stereoTracks[i].label }",NAME="${ COMMON_LANGUAGES[stereoTracks[i].label] }",DEFAULT=${ i === 0 ? 'YES' : 'NO' },AUTOSELECT=YES,URI="audio/${ stereoTracks[i].label }/stereo/audio.m3u8"`;
    str += `\n`;
    const surroundTracks: IAudioRenditionInfo[] = audio.filter((track: IAudioRenditionInfo) => track.channels === 6);
    for (let i: number = 0; i < surroundTracks.length; i++)
      str += `\n#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="surround",LANGUAGE="${ surroundTracks[i].label }",NAME="${ COMMON_LANGUAGES[surroundTracks[i].label] }",DEFAULT=${ i === 0 ? 'YES' : 'NO' },AUTOSELECT=YES,URI="audio/${ surroundTracks[i].label }/surround/audio.m3u8"`;
    return str;
  }

  generateVideoManifestInfo(video: IVideoRenditionInfo[]): string {
    var str: string = '';
    const lowRes: IVideoRenditionInfo[] = video.filter((track: IVideoRenditionInfo) => track.width <= 640).reverse();
    const stereoBitRate: number = COMMON_AUDIO.find((rendition: IAudioRenditionInfo) => rendition.label === 'stereo').bitRate;
    for (let i: number = 0; i < lowRes.length; i++) {
      const resolution: IVideoRenditionInfo = COMMON_RESOLUTIONS.find((res: IVideoRenditionInfo) => res.width === lowRes[i].width);
      str += `\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=${ resolution.bitRate + stereoBitRate },CODECS="${ lowRes[i].codec },mp4a.40.2",AUDIO="stereo",RESOLUTION=${ lowRes[i].width }x${ lowRes[i].height },SUBTITLES="subs"\nvideo/${ lowRes[i].label }/video.m3u8`;
    }
    const highRes: IVideoRenditionInfo[] = video.filter((track: IVideoRenditionInfo) => track.width > 640).reverse();
    const surroundBitRate: number = COMMON_AUDIO.find((rendition: IAudioRenditionInfo) => rendition.label === 'surround').bitRate;
    for (let i: number = 0; i < highRes.length; i++) {
      const resolution: IVideoRenditionInfo = COMMON_RESOLUTIONS.find((res: IVideoRenditionInfo) => res.width === highRes[i].width);
      str += `\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=${ resolution.bitRate + surroundBitRate },CODECS="${ highRes[i].codec },mp4a.40.2",AUDIO="surround",RESOLUTION=${ highRes[i].width }x${ highRes[i].height },SUBTITLES="subs"\nvideo/${ highRes[i].label }/video.m3u8`;
    }
    return str;
  }

}
