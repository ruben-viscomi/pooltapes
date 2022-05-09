import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsEnum, IsArray } from "class-validator";
import { Type } from 'class-transformer';

import { Dash } from '../../common/dash.enum';

export class CreateCategoryDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  movie: boolean;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsEnum(Dash, { each: true })
  dash: Dash[];

}
