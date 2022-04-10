import { IsOptional, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateVideoDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  host: string;

  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  audio: string[];

  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  subtitles: string[];

}
