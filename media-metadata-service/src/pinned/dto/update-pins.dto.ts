import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PinDto } from './pin.dto';

export class UpdatePinsDto {

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PinDto)
  toPush: PinDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PinDto)
  toPull: PinDto[];

}
