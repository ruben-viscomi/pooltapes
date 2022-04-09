import { IsOptional, IsNotEmpty, IsUUID, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto {

  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsUUID('4')
  videoId: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  release: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  expires: number;

}
