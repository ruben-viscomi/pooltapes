import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pinned, PinnedDocument } from './pinned.model';
import { Movie, MovieDocument, MovieSchema } from '../movies/movie.model';
import { Series, SeriesDocument, SeriesSchema } from '../series/series.model';
import { Media, MediaDocument } from '../media/media.model';

export class PinnedRepository {

  private readonly moviesPopulator;

  private readonly seriesPopulator;

  private movieModel: Model<MovieDocument>;
  private seriesModel: Model<SeriesDocument>;

  constructor(
    @InjectModel(Pinned.name) public readonly model: Model<PinnedDocument>,
    // @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    // @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>
  ) {
    this.movieModel = mediaModel.discriminators.Movie;
    this.seriesModel = mediaModel.discriminators.Series;

    this.moviesPopulator = {
      path: 'media',
      model: this.movieModel,
      populate: { path: 'video' }
    }
    this.seriesPopulator = {
      path: 'media',
      model: this.seriesModel,
      pupulate: { path: 'seasons.episodes' }
    };
  }

  async createPinSection(section: string): Promise<Pinned> {
    const found: Pinned = await this.model.findOne({ section });
    if (found) return undefined;
    return await this.model.create({ section });
  }

  async getPopulated(section: string): Promise<Pinned> {
    const found: PinnedDocument = await this.model.findOne({ section }).populate([this.moviesPopulator, this.seriesPopulator]);
    // if (!found) return undefined;
    // const movies = found.media.filter((med) => med.movie);
    // if (movies) await this.model.populate(movies, this.moviesPopulator);
    // const series = found.media.filter((med) => !med.movie);
    // if (series) await this.model.populate(series, this.seriesPopulator);
    // found.media = [...movies, ...series];
    return found;
  }

}
