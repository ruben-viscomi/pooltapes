import { IsInt, Min, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEpisodesDto {

  @IsArray()
  @Type(() => ValidateEpisode)
  @ValidateNested({ each: true })
  episodes: ValidateEpisode[];

}

class ValidateEpisode {

  @Type(() => Number)
  @IsInt()
  @Min(1)
  episodeNumber: number;

  @IsUUID('4')
  episodeId: string;

}
