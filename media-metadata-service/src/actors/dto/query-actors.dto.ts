import { IsOptional, IsInt, Min, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryActorsDto {

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

}
