import { IsOptional, IsUUID } from 'class-validator';

export class UpdatePinsDto {

  @IsOptional()
  @IsUUID('4', { each: true })
  toPush: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  toPull: string[];

}
