import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSeasonDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  // NOTE: may add support for episodes push or pull.

}
