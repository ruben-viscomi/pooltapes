import { IBaseRenditionInfo } from './base-rendition-info.interface';

export interface IVideoRenditionInfo extends IBaseRenditionInfo {

  codec: string;
  width: number;
  height: number;

}
