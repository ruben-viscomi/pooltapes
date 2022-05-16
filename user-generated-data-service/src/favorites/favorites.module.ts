import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MediaModule } from '../media/media.module';
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
    MediaModule,
    VideosModule
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoriteRepository
  ]
})
export class FavoritesModule {}
