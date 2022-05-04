import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { CategoryRepository } from './category.repository';
import { Category, CategoryDocument } from './category.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(private readonly categoryRepo: CategoryRepository) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const initialization = {
      search: category.title.split(' '),
      media: []
    };
    return await this.categoryModel.create({ ...category, ...initialization });
  }

  async getCategories(query: QueryCategoriesDto): Promise<Category[]> {
    var dbQuery = {};
    var { search } = query;

    if (search) {
      search.replace(/\s/g, '\\s');
      Object.assign(query, { title: { $regex: `^${search}`, $options: 'i' } });
      delete query.search;
    }

    return await this.categoryRepo.getPopulatedAll(query);

    // TODO: in case returned categories length < 'limit', perform 2nd pass using split 'search' in 'category.search'
  }

  async getCategory(id: string): Promise<Category> {
    const foundCategory: Category = await this.categoryRepo.getPopulatedById(id);
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

  private get categoryModel(): Model<CategoryDocument> { return this.categoryRepo.model; }

}
