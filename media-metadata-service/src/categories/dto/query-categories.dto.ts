import { IsOptional, IsInt, Min, IsIn, IsNotEmpty, IsString, IsBooleanString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { Dash } from '../../common/dash.enum';

export class QueryCategoriesDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  from: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsIn([25, 50, 100])
  limit: number = 25;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBooleanString()
  movie: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(Dash)
  dash: Dash;

}
