import { IsOptional, IsNotEmpty, IsUUID, IsInt, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { Season } from '../season.type';

export class UpdateSeriesDto {

  @IsOptional()
  @IsNotEmpty()
  title: string;

  // TODO: remove from here and use separate routing to push seasons. One at the time.
  @IsOptional()
  @IsUUID('4')
  seasons: Season[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  release: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  expires: number;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  tags: string[];

}
