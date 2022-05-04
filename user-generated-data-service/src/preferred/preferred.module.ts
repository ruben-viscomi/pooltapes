import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';
import { VideosModule } from '../videos/videos.module';
import { PreferredService } from './preferred.service';
import { FavoriteRepository } from './favorite.repository';
import { PreferredController } from './preferred.controller';
import { Preferred, PreferredSchema } from './preferred.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preferred.name, schema: PreferredSchema }], 'user-generated'),
    AuthModule,
    UsersModule,
    MoviesModule,
    SeriesModule,
    VideosModule
  ],
  controllers: [PreferredController],
  providers: [
    PreferredService,
    FavoriteRepository
  ]
})
export class PreferredModule {}
