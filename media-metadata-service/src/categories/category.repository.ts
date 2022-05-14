import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './category.model';
import { Movie, MovieDocument, MovieSchema } from '../movies/movie.model';
import { Series, SeriesDocument, SeriesSchema } from '../series/series.model';
import { Media, MediaDocument } from '../media/media.model';

export class CategoryRepository {

  private readonly moviesPopulator;

  private readonly seriesPopulator;

  private movieModel: Model<MovieDocument>;
  private seriesModel: Model<SeriesDocument>;

  constructor(
    @InjectModel(Category.name) public readonly model: Model<CategoryDocument>,
    // @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    // @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>
  ) {
    this.movieModel = mediaModel.discriminators.Movie;
    this.seriesModel = mediaModel.discriminators.Series;

    this.seriesPopulator = {
      path: 'media',
      model: this.seriesModel,
      populate: { path: 'seasons.episodes', model: 'Video' }
    };

    this.moviesPopulator = {
      path: 'media',
      model: this.movieModel,
      populate: { path: 'video', model: 'Video' }
    };
  }

  async getPopulatedAll(query: any): Promise<Category[]> {
    const { movie } = query;
    const { from, limit } = this.getLimitsFromQuery(query);

    const found: Category[] = await this.model.find(query).skip(from).limit(limit).populate([this.seriesPopulator, this.moviesPopulator]);

    // // NOTE: mongoose won't populate hashmaps, so the algorithm became O(q + 5n + 2p) [time complexity] and O(3n) [spatial complexity].
    // var movieCatsRaw: Category[] = await this.populateWithMovies(found.filter((cat: Category) => cat.movie));
    // var seriesCatsRaw: Category[] = await this.populateWithSeries(found.filter((cat: Category) => !cat.movie));
    //
    // // TODO: implement strategy. if query.dash, sort by position
    //
    // const movieCats: Category[] = this.convertToHash(movieCatsRaw)
    // const seriesCats: Category[] = this.convertToHash(seriesCatsRaw);
    //
    // for (let cat of found) {
    //   if (cat.movie) cat = movieCats[cat._id];
    //   else cat = seriesCats[cat._id];
    // }

    return found;
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

  private convertToHash(categories: Category[]): Category[] {
    var cats: Category[] = [];
    for (let cat of categories) cats[cat._id] = cat;
    categories = undefined;
    return cats;
  }

  private toBool(val: string): boolean { return (val === 'true') ? true : false }

}
