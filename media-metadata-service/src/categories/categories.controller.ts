import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { AllowRoles } from '../decorators/allow-roles.decorator';
import { Roles } from '../common/roles.enum';

import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(IsAdminGuard)
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @AllowRoles(Roles.CONTENT)
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(category);
  }

  @Get()
  @UseGuards(IsLoggedGuard)
  getCategories(@Query() query: QueryCategoriesDto): Promise<Category[]> {
    return this.categoriesService.getCategories(query);
  }

  @Get(':id')
  @UseGuards(IsLoggedGuard)
  getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategory(id);
  }

  @Patch(':id')
  @AllowRoles(Roles.CONTENT)
  updateCategory(@Param('id') id: string, @Body() updated: UpdateCategoryDto): Promise<void> {
    return this.categoriesService.updateCategory(id, updated);
  }

  @Delete(':id')
  @AllowRoles(Roles.CONTENT)
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }

}
