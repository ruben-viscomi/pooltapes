// import { IMovie } from './movie.model';
// import { ISeries } from './series.model';
import { Dash } from './dash.enum';

export interface ICategory {
  _id: string;
  title: string;
  search: string[];
  media: any;
  movie: boolean;
  dash: Dash;
}
