import { IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class PreferredDto {

  @IsUUID('4')
  media: string;

  @Type(() => Boolean)
  @IsBoolean()
  movie: boolean;

}
