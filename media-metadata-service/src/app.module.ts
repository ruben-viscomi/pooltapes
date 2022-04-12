import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { JwtModule, JwtService } from '@nestjs/jwt';

import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { CategoriesModule } from './categories/categories.module';
import { ActorsModule } from './actors/actors.module';
import { VideosModule } from './videos/videos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    SeriesModule,
    CategoriesModule,
    ActorsModule,
    VideosModule,
    AuthModule,
  ]
})
export class AppModule {}
