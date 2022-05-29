import { IsBoolean, IsUUID, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ViewDto {

  @IsUUID('4')
  mediaId: string;

  @IsUUID('4')
  video: string;

  @IsIn(['movie', 'series'])
  viewType: string;

  @Type(() => Number)
  @Min(0)
  watchTimeMarker: number = 0;

  @Type(() => Boolean)
  completed: boolean = false;

}
