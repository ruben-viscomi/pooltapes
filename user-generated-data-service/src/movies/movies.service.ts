import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie, MovieDocument } from './movie.model';

@Injectable()
export class MoviesService {

  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async like(id: string, options: any): Promise<void> {
    const { isChange } = options;
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) throw new BadRequestException('movie doesn\'t exists');
    movie.likes += 1;
    if (isChange) movie.dislikes -= 1;
    await movie.save();
  }

  async dislike(id: string, options: any): Promise<void> {
    const { isChange } = options;
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) throw new BadRequestException('movie doesn\'t exists');
    movie.dislikes += 1;
    if (isChange) movie.likes -= 1;
    await movie.save();
  }

  async removeReaction(id: string, isLike: boolean): Promise<void> {
    const movie: MovieDocument = await this.movieModel.findById(id);
    if (!movie) throw new BadRequestException('movie doesn\'t exists');
    if (isLike) movie.likes -= 1;
    else movie.dislikes -= 1;
    await movie.save();
  }

}
