import { IsUUID, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class PinDto {

  @IsUUID('4')
  media: string;

  @Type(() => Boolean)
  @IsBoolean()
  movie: boolean;

}
