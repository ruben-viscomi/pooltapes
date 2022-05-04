import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Preferred, PreferredDocument } from './preferred.model';

import { Movie, MovieDocument } from '../movies/movie.model';
import { Series, SeriesDocument } from '../series/series.model';
import { Video, VideoDocument } from '../videos/video.model';

export class FavoriteRepository {

  private readonly moviePopulator: any = {
    path: 'media',
    model: this.movieModel,
    populate: 'video'
  };

  private readonly seriesPopulator: any = {
    path: 'media',
    model: this.seriesModel,
    populate: 'seasons.episodes'
  };

  constructor(
    @InjectModel(Preferred.name) public readonly model: Model<PreferredDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>,
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>
  ) {}

  async getPopulatedAll(query: any): Promise<Preferred[]> {
    const found: Preferred[] = await this.model.find(query);
    const favMovies: Preferred[] = await this.populateMovies(found.filter((fav: Preferred) => fav.movie));
    const favSeries: Preferred[] = await this.populateSeries(found.filter((fav: Preferred) => !fav.movie));
    return [...favMovies, ...favSeries];
  }

  async getPopulatedById(query: { _id: string, userId: string }): Promise<Preferred> {
    const found: Preferred = await this.model.findOne(query);
    if (!found) return undefined;
    if (found.movie) return await this.model.populate(found, this.moviePopulator);
    return await this.model.populate(found, this.seriesPopulator);
  }

  private async populateMovies(favorites: Preferred[]): Promise<Preferred[]> {
    return await this.model.populate(favorites, this.moviePopulator);
  }

  private async populateSeries(favorites: Preferred[]): Promise<Preferred[]> {
    return await this.model.populate(favorites, this.seriesPopulator);
  }

}
