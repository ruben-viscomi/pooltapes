import { IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { Dash } from '../../common/dash.enum';

export class DashPositionDto {

  @Type(() => Number)
  @Min(1)
  position: number;

  @Type(() => Number)
  @IsEnum(Dash)
  type: Dash;

}
