import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';


import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';
import { Category, CategorySchema } from './category.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule,
    MoviesModule,
    SeriesModule
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoryRepository
  ]
})
export class CategoriesModule {}
