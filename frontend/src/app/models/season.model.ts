import { IVideo } from './video.model';

export interface ISeason {
  season: number
  episodes: IVideo[];
}
