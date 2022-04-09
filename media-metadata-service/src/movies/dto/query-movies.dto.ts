import { IsOptional, IsInt, Min, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryMoviesDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  from: number;

  @IsOptional()
  @IsIn([25, 50, 100])
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;

}
