import { IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ViewDto {

  @IsUUID('4')
  mediaId: string;
  
  @IsUUID('4')
  video: string;

}
