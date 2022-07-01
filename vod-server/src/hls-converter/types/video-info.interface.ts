import { IBaseInfo } from './base-info.interface';

export interface IVideoInfo extends IBaseInfo {

  width: number;
  height: number;
  videoStreamIndex: number;
  aspectRatio: string;

}
