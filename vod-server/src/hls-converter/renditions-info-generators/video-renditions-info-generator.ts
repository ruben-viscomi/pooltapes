import { IRenditionsInfoGenerator } from '../interfaces/renditions-info-generator.interface';

import { COMMON_RESOLUTIONS } from '../data/common-resolutions.data';

import { IVideoInfo } from '../types/video-info.interface';
import { IVideoRenditionInfo } from '../types/video-rendition-info.interface';

export class VideoRenditionsInfoGenerator implements IRenditionsInfoGenerator {

  private _info: IVideoInfo;

  constructor(info: IVideoInfo) { this._info = info }

  generate(): IVideoRenditionInfo[] {
    const { aspectRatio, width, height } = this._info;
    const commonRes: IVideoRenditionInfo[] = this.getCommonResolutions(width);
    var generatedInfo: IVideoRenditionInfo[] = [{
      width, height,
      bitRate: commonRes[0].bitRate,
      label: commonRes[0].label,
      codec: commonRes[0].codec
    }];

    for (let i = 1; i < commonRes.length; i++)
      generatedInfo.push({
        width: commonRes[i].width,
        height: this.calculateHeightFromAR(commonRes[i].width, aspectRatio),
        bitRate: commonRes[i].bitRate,
        label: commonRes[i].label,
        codec: commonRes[i].codec
      });

    return generatedInfo;
  }

  private getCommonResolutions(width: number): IVideoRenditionInfo[] {
    return COMMON_RESOLUTIONS.filter((resolution: any) => resolution.width <= width);
  }

  private calculateHeightFromAR(width, aspectRatio: string): number {
    const [widthSide, heightSide] = aspectRatio.split(':');
    const rawHeight: number = Math.trunc(width * (Number(heightSide) / Number(widthSide)));
    if (rawHeight % 2 !== 0) return rawHeight - 1;
    return rawHeight;
  }

}
