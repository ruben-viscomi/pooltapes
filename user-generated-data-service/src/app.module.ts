import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ReactionsModule } from './reactions/reactions.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { ViewsModule } from './views/views.module';
import { PreferredModule } from './preferred/preferred.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI, { connectionName: 'user-generated' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI_MEDIA, { connectionName: 'media-metadata' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI_AUTH, { connectionName: 'auth' }),
    ReactionsModule,
    AuthModule,
    MoviesModule,
    SeriesModule,
    ViewsModule,
    PreferredModule,
    UsersModule,
    VideosModule
  ]
})
export class AppModule {}
