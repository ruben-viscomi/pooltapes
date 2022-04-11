import { IsNotEmpty, IsString, IsInt, IsOptional, IsEmail, IsEnum, Matches, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

import { Gender } from '../../common/gender.enum';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  mail: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?!.*[.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password is too weak.' }
  )
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  birthDate: number; // Unix Time Stamp

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

}
