import { IsOptional, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

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
