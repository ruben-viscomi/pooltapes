import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';
import { VideosModule } from '../videos/videos.module';
import { FavoritesService } from './favorites.service';
import { FavoriteRepository } from './favorite.repository';
import { FavoritesController } from './favorites.controller';
import { Favorite, FavoriteSchema } from './favorite.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }], 'user-generated'),
    AuthModule,
    UsersModule,
    MoviesModule,
    SeriesModule,
    VideosModule
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoriteRepository
  ]
})
export class FavoritesModule {}
