import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsEnum, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

import { DashPositionDto } from './dash-position.dto';

export class CreateCategoryDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  movie: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DashPositionDto)
  dash: DashPositionDto[];

}
