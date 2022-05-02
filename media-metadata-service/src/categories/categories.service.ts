import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './category.model';
import { Movie, MovieDocument } from '../movies/movie.model';
import { Series, SeriesDocument } from '../series/series.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const initialization = {
      search: category.title.split(' '),
      media: []
    };
    return await this.categoryModel.create({ ...category, ...initialization });
  }

  async getCategories(query: QueryCategoriesDto): Promise<Category[]> {
    var dbQuery = {};
    const limit: number = query.limit ? query.limit : 25;
    const from: number = query.from ? query.from : 0;
    var { search, movie, dash } = query;
    if (search) {
      search.replace(/\s/g, '\\s');
      dbQuery = { title: { $regex: `^${search}`, $options: 'i' } };
    }
    if (dash !== undefined)
      Object.assign(dbQuery, { dash });
    var result = [];
    if (this.toBool(movie) || movie === undefined)
      result.push(...await this.categoryModel.find({...dbQuery, movie: true }).populate({
        path: 'media',
        model: this.movieModel,
        populate: 'video'
      }));
    if (!this.toBool(movie) || movie === undefined)
      result.push(...await this.categoryModel.find({...dbQuery, movie: false }).populate({
        path: 'media',
        model: this.seriesModel,
        populate: 'seasons'
      }))
    // return await this.categoryModel.find(dbQuery).skip(from).limit(limit);
    return result;
    // TODO: in case returned categories length < 'limit', perform 2nd pass using split 'search' in 'category.search'
  }

  async getCategory(id: string): Promise<Category> {
    const foundCategory: Category = await this.categoryModel.findById(id);
    if (!foundCategory) throw new NotFoundException();
    return foundCategory;
  }

  async updateCategory(id: string, updated: UpdateCategoryDto): Promise<void> {
    const { title } = updated;
    if (title) Object.assign(updated, { search: title.split(' ') });
    await this.categoryModel.findByIdAndUpdate(id, updated);
  }

  async deleteCategory(id: string): Promise<void> {
    // TODO: also delete referenced video from both DB and VOD servers.
    await this.categoryModel.findByIdAndDelete(id);
  }

  private toBool(val: string): boolean {
    return (val === 'true') ? true : false;
  }

}
