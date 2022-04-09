import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie, MovieDocument } from './movie.model';

@Injectable()
export class MoviesService {

  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async createMovie(movie: any): Promise<any> {
    return await this.movieModel.create(movie);
  }

  async getMovies(query: any): Promise<any> {
    // query destructuring
    return await this.movieModel.find({});
  }

  async getMovie(id: string): Promise<any> {
    return await this.movieModel.findById(id);
  }

  async updateMovie(id: string, updated: any): Promise<any> {
    return await this.movieModel.findByIdAndUpdate(id, updated);
  }

  async deleteMovie(id: string): Promise<any> {
    return await this.movieModel.findByIdAndDelete(id);
  }

}
