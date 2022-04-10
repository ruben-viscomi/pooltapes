import { IsOptional, IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { Gender } from '../gender.enum';

export class UpdateActorDto {

  @IsOptional()
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
