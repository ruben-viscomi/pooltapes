import { IBaseInfo } from './base-info.interface';

export interface ISubtitleInfo extends IBaseInfo {

  subtitleStreamIndex: number;
  language: string;
  forced: boolean;
  
}
