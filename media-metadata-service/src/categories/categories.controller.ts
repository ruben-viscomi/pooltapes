import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(category);
  }

  @Get()
  getCategories(@Query() query: QueryCategoriesDto): Promise<Category[]> {
    return this.categoriesService.getCategories(query);
  }

  @Get(':id')
  getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategory(id);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() updated: UpdateCategoryDto): Promise<void> {
    return this.categoriesService.updateCategory(id, updated);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }

}
