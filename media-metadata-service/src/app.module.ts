import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { CategoriesModule } from './categories/categories.module';
import { ActorsModule } from './actors/actors.module';
import { VideosModule } from './videos/videos.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { PinnedModule } from './pinned/pinned.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI, { connectionName: 'metadata' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI_AUTH, { connectionName: 'auth' }),
    SeriesModule,
    CategoriesModule,
    ActorsModule,
    VideosModule,
    AuthModule,
    AdminModule,
    UsersModule,
    PinnedModule
  ]
})
export class AppModule {}
