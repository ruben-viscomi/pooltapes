import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CredentialsDto {

  @IsNotEmpty()
  @IsString()
  internNum: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;

}
