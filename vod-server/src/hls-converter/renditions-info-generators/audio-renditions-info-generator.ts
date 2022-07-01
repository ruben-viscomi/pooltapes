import { IRenditionsInfoGenerator } from '../interfaces/renditions-info-generator.interface';

import { COMMON_AUDIO } from '../data/common-audio.data';

import { IAudioInfo } from '../types/audio-info.interface';
import { IAudioRenditionInfo } from '../types/audio-rendition-info.interface';

export class AudioRenditionsInfoGenerator implements IRenditionsInfoGenerator {

  private _info: IAudioInfo;

  constructor(info: IAudioInfo) { this._info = info }

  generate(): IAudioRenditionInfo[] {
    const { bitRate, channels, sampleRate, language } = this._info;
    const commonAudio: IAudioRenditionInfo[] = this.getCommonAudio(channels);
    var generatedInfo: IAudioRenditionInfo[] = [{
      channels,
      sampleRate: commonAudio[0].sampleRate,
      bitRate: commonAudio[0].bitRate,
      label: language
    }];

    for (let i = 1; i < commonAudio.length; i++)
      generatedInfo.push({
        channels: commonAudio[i].channels,
        sampleRate: commonAudio[i].sampleRate,
        bitRate: commonAudio[i].bitRate,
        label: language
      });

    return generatedInfo;
  }

  private getCommonAudio(channels: number): IAudioRenditionInfo[] {
    return COMMON_AUDIO.filter((audio: IAudioRenditionInfo) => audio.channels <= channels);
  }

}
