import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './category.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const initialization = {
      search: category.title.split(' '),
      mediaIds: []
    };
    return await this.categoryModel.create({ ...category, ...initialization });;
  }

  async getCategories(query: QueryCategoriesDto): Promise<Category[]> {
    var dbQuery = {};
    const limit: number = query.limit ? query.limit : 25;
    const from: number = query.from ? query.from : 0;
    var search = query.search;
    if (search) {
      search.replace(/\s/g, '\\s');
      dbQuery = { title: { $regex: `^${search}`, $options: 'i' } };
    }
    return await this.categoryModel.find(dbQuery).skip(from).limit(limit);
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

}
