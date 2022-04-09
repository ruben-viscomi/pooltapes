import { IsNotEmpty, IsUUID, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {

  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  cast: string[]; // UUID[]

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  release: number; // Date.valueOf()

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  expires: number; // Date.valueOf()

}
