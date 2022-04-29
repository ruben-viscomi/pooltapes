import { IsOptional, IsInt, Min, IsIn, IsNotEmpty, IsString, IsBooleanString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCategoriesDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  from: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([25, 50, 100])
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBooleanString()
  movies: boolean;

}
