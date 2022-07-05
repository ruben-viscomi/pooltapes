import { AudioRenditionsInfoGenerator, VideoRenditionsInfoGenerator } from '../generators';
import { IRenditionsInfoGenerator } from '../interfaces';
import { IAudioInfo, IVideoInfo, ISubtitleInfo } from '../types';

export class RenditionsInfoGeneratorFactory {

  static createForInfo(info: IVideoInfo | IAudioInfo | ISubtitleInfo): IRenditionsInfoGenerator {
    if (info.type === 'video') return new VideoRenditionsInfoGenerator(<IVideoInfo>info);
    if (info.type === 'audio') return new AudioRenditionsInfoGenerator(<IAudioInfo>info);
  }

}
