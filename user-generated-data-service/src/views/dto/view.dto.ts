import { IsBoolean, IsUUID, IsIn, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ViewDto {

  @IsUUID('4')
  mediaId: string;

  @IsUUID('4')
  video: string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  watchTimeMarker: number = 0;

}
