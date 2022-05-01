import { IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ViewDto {

  @IsUUID('4')
  mediaId: string;

  @Type(() => Boolean)
  @IsBoolean()
  movie: boolean;

  @IsUUID('4')
  video: string;

}
