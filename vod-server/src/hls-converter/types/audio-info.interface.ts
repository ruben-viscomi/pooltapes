import { IBaseInfo } from './base-info.interface';

export interface IAudioInfo extends IBaseInfo {

  channels: number;
  audioStreamIndex: number;
  language: string;
  sampleRate: number;
  
}
