import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './category.model';
import { Movie, MovieDocument } from '../movies/movie.model';
import { Series, SeriesDocument } from '../series/series.model';

export class CategoryRepository {

  private readonly moviesPopulator = {
    path: 'media',
    model: this.movieModel,
    populate: 'video'
  };

  private readonly seriesPopulator = {
    path: 'media',
    model: this.seriesModel,
    populate: 'seasons'
  };

  constructor(
    @InjectModel(Category.name) public readonly model: Model<CategoryDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>
  ) {}

  async getPopulatedAll(query: any): Promise<Category[]> {
    const { movie } = query;
    const { from, limit } = this.getLimitsFromQuery(query);

    const found: Category[] = await this.model.find(query).skip(from).limit(limit);
    const movieCats: Category[] = await this.populateWithMovies(found.filter((cat: Category) => cat.movie));
    const seriesCats: Category[] = await this.populateWithSeries(found.filter((cat: Category) => !cat.movie));

    return [...movieCats, ...seriesCats];
  }

  async getPopulatedById(id: string): Promise<Category> {
    const category: CategoryDocument = await this.model.findById(id);
    if (!category) return undefined;

    if (category.movie)
      return await category.populate(this.moviesPopulator);
    return await category.populate(this.seriesPopulator);
  }

  private async populateWithMovies(cats: Category[]): Promise<Category[]> {
    return await this.model.populate(cats, this.moviesPopulator);
  }

  private async populateWithSeries(cats: Category[]): Promise<Category[]> {
    return await this.model.populate(cats, this.seriesPopulator);
  }

  private getLimitsFromQuery(query: any): { from: number, limit: number } {
    const { from, limit } = query;
    delete query.from; delete query.limit;
    return { from, limit };
  }

  private toBool(val: string): boolean { return (val === 'true') ? true : false }

}
