import { IMovie } from './movie.model';
import { ISeries } from './series.model';

export interface IFavorite {
  _id: string;
  userId: string;
  media: IMovie | ISeries;
  added: number;
}
