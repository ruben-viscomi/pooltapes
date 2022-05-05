import { IsNotEmpty, IsUUID, IsOptional, IsInt, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSeriesDto {

  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  cast: string[];

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
