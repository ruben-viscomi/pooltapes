import { IsOptional, IsNotEmpty, IsString, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { Dash } from '../../common/dash.enum';

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
  @Type(() => Number)
  @IsEnum(Dash)
  dash: Dash;

}
