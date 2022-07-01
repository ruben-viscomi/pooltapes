import { VideoRenditionsInfoGenerator } from './renditions-info-generators/video-renditions-info-generator';
import { AudioRenditionsInfoGenerator } from './renditions-info-generators/audio-renditions-info-generator';

import { IRenditionsInfoGenerator } from './interfaces/renditions-info-generator.interface';

import { IVideoInfo } from './types/video-info.interface';
import { IAudioInfo } from './types/audio-info.interface';
import { ISubtitleInfo } from './types/subtitle-info.interface';

export class RenditionsInfoGeneratorFactory {

  static createForInfo(info: IVideoInfo | IAudioInfo | ISubtitleInfo): IRenditionsInfoGenerator {
    if (info.type === 'video') return new VideoRenditionsInfoGenerator(<IVideoInfo>info);
    if (info.type === 'audio') return new AudioRenditionsInfoGenerator(<IAudioInfo>info);
  }

}
