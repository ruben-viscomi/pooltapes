import { IsOptional, IsNotEmpty, IsString, IsUUID, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { DashPositionDto } from './dash-position.dto';

export class UpdateCategoryDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  // TODO: remove from here and create dedicated route to $push (POST), $pull(DELETE) medias.
  @IsOptional()
  @IsUUID('4', { each: true })
  media: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DashPositionDto)
  dash: DashPositionDto[];

}
