import { IsUUID, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class AuthenticatedDto {

  @IsUUID('4')
  id: string;

  @Type(() => Boolean)
  @IsBoolean()
  isAdmin: boolean;

}
