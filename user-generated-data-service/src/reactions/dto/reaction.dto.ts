import { IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ReactionDto {

  @IsUUID('4')
  mediaId: string;

  @Type(() => Boolean)
  @IsBoolean()
  movie: boolean;

}