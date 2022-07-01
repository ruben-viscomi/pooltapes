import { IVideoInfo } from '../types/video-info.interface';
import { IAudioInfo } from '../types/audio-info.interface';
import { ISubtitleInfo } from '../types/subtitle-info.interface';

export interface IRenditionsInfoGenerator {

  // TODO: return eg. 'IVideoRendition'
  generate(): any[];

}
