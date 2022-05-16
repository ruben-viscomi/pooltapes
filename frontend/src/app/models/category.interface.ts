import { Dash } from './dash.enum';
import { IMovie } from './movie.interface';
import { ISeries } from './series.interface';

export interface ICategory {

  _id: string;
  title: string;
  search: string[];
  media: (IMovie | ISeries)[];
  movie: boolean;
  dash: Dash;

}
