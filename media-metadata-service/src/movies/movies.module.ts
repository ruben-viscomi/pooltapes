import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './movie.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MongooseModule]
})
export class MoviesModule {}
