import { IsOptional, IsNotEmpty, IsInt, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { Gender } from '../gender.enum';

export class CreateActorDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  birthdate: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

}
