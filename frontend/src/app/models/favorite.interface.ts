import { IMovie } from './movie.interface';
import { ISeries } from './series.interface';

export interface IFavorite {

  _id: string;
  userId: string;
  media: IMovie | ISeries;
  added: number;

}
