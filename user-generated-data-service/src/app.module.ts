import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ReactionsModule } from './reactions/reactions.module';
import { AuthModule } from './auth/auth.module';
import { ViewsModule } from './views/views.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_URI,
      { connectionName: 'user-generated', dbName: process.env.MONGO_DB_NAME }
    ),
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_URI,
      { connectionName: 'media-metadata', dbName: process.env.MONGO_DB_NAME_MEDIA }
    ),
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_URI,
      { connectionName: 'auth', dbName: process.env.MONGO_DB_NAME_AUTH }
    ),
    ReactionsModule,
    AuthModule,
    ViewsModule,
    FavoritesModule,
    UsersModule,
    VideosModule,
    MediaModule
  ]
})
export class AppModule {}
