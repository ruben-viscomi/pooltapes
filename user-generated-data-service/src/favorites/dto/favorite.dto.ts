import { IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FavoriteDto {

  @IsUUID('4')
  media: string;

}
