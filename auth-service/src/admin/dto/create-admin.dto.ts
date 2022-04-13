import { IsNotEmpty, IsEnum, IsString, MinLength, MaxLength, Matches } from 'class-validator';

import { Roles } from '../../common/roles.enum';

export class CreateAdminDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  internNum: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?!.*[.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password is too weak.' }
  )
  password: string;

  @IsEnum(Roles)
  role: Roles;

}
