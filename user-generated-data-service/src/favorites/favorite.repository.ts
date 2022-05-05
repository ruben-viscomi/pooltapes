import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Favorite, FavoriteDocument } from './favorite.model';

import { Movie, MovieDocument } from '../movies/movie.model';
import { Series, SeriesDocument } from '../series/series.model';
import { Video, VideoDocument } from '../videos/video.model';

@Injectable()
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
    @InjectModel(Favorite.name) public readonly model: Model<FavoriteDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>,
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>
  ) {}

  async getPopulatedAll(query: any): Promise<Favorite[]> {
    const found: Favorite[] = await this.model.find(query);

    const favMovies: Favorite[] = await this.populateMovies(found.filter((fav: Favorite) => fav.movie));
    const favSeries: Favorite[] = await this.populateSeries(found.filter((fav: Favorite) => !fav.movie));

    return [...favMovies, ...favSeries].sort((a: Favorite, b: Favorite) => a.added - b.added);
  }

  async getPopulatedById(query: { _id: string, userId: string }): Promise<Favorite> {
    const found: Favorite = await this.model.findOne(query);
    if (!found) return undefined;
    if (found.movie) return await this.model.populate(found, this.moviePopulator);
    return await this.model.populate(found, this.seriesPopulator);
  }

  private async populateMovies(favorites: Favorite[]): Promise<Favorite[]> {
    return await this.model.populate(favorites, this.moviePopulator);
  }

  private async populateSeries(favorites: Favorite[]): Promise<Favorite[]> {
    return await this.model.populate(favorites, this.seriesPopulator);
  }

}
