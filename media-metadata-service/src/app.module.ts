import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    SeriesModule,
    CategoriesModule
  ]
})
export class AppModule {}
