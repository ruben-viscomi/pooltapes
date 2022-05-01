import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsEnum } from "class-validator";

import { Dash } from '../../common/dash.enum';

export class CreateCategoryDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  movie: boolean;

  @IsOptional()
  @IsEnum(Dash)
  dash: Dash;

}
