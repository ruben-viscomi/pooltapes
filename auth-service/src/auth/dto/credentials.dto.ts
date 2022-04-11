import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CredentialsDto {

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;

}
