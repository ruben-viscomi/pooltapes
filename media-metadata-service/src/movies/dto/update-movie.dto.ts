import { IsOptional, IsNotEmpty, IsUUID, IsInt, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto {

  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsUUID('4')
  video: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  release: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  expires: number;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  tags: string[];

}
