import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pinned, PinnedDocument } from './pinned.model';
import { Movie, MovieDocument } from '../movies/movie.model';
import { Series, SeriesDocument } from '../series/series.model';

export class PinnedRepository {

  private readonly moviePopulator = {
    path: 'media',
    model: this.movieModel,
    populate: { path: 'video' }
  };

  private readonly seriesPopulator = {
    path: 'media',
    model: this.seriesModel,
    pupulate: { path: 'seasons.episodes' }
  };

  constructor(
    @InjectModel(Pinned.name) public readonly model: Model<PinnedDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>
  ) {}

  async createPinSection(section: string): Promise<Pinned> {
    const found: Pinned = await this.model.findOne({ section });
    if (found) return undefined;
    return await this.model.create({ section });
  }

  async getPopulated(section: string): Promise<Pinned> {
    const found: PinnedDocument = await this.model.findOne({ section });
    if (!found) return undefined;
    const movies = found.media.filter((med) => med.movie);
    if (movies) await this.model.populate(movies, this.moviePopulator);
    const series = found.media.filter((med) => !med.movie);
    if (series) await this.model.populate(series, this.seriesPopulator);
    found.media = [...movies, ...series];
    return found;
  }

}
