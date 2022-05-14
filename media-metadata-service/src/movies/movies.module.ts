import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './movie.repository';
import { Media, MediaSchema } from '../media/media.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    MovieRepository
  ],
  exports: [MongooseModule]
})
export class MoviesModule {}
