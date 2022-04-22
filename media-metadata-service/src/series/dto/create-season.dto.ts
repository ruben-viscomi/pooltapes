import { IsInt, Min, IsOptional, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSeasonDto {

  @IsInt()
  @Min(1)
  @Type(() => Number)
  season: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  episodes: string[];

}
