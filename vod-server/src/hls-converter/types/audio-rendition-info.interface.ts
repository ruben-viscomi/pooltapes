import { IBaseRenditionInfo } from './base-rendition-info.interface';

export interface IAudioRenditionInfo extends IBaseRenditionInfo {

  channels: number;
  sampleRate: number;
  
}
