import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './movie.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }], 'media-metadata')
  ],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
