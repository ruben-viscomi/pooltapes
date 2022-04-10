import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie, MovieDocument } from './movie.model';

import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {

  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    if (movie.expires <= Date.now()) throw new BadRequestException('Movies can\'t expire at creation time');
    const initialization = {
      search: movie.title.split(' '),
      uploaded: Date.now(),
      views: 0, likes: 0, dislikes: 0,
      cast: []
    };
    const created: Movie = await this.movieModel.create({ ...movie, ...initialization });
    if (created.expires) this.deleteExpiredMovie(created._id, created.expires);
    return created;
  }

  async getMovies(query: QueryMoviesDto): Promise<Movie[]> {
    var dbQuery = {};
    const limit: number = query.limit ? query.limit : 25;
    const from: number = query.from ? query.from : 0;
    var search = query.search;
    if (search) {
      search.replace(/\s/g, '\\s');
      dbQuery = { title: { $regex: `^${search}`, $options: 'i' } };
    }
    return await this.movieModel.find(dbQuery).skip(from).limit(limit);
    // TODO: in case returned movies length < 'limit', perform 2nd pass using split 'search' in 'movie.search'
  }

  async getMovie(id: string): Promise<Movie> {
    const foundMovie: Movie = await this.movieModel.findById(id);
    if (!foundMovie) throw new NotFoundException();
    return foundMovie;
  }

  async updateMovie(id: string, updated: UpdateMovieDto): Promise<void> {
    const { expires, title } = updated;
    if (expires <= Date.now()) throw new BadRequestException('Movies can\'t expire at updation time');
    if (title) Object.assign(updated, { search: title.split(' ') });
    await this.movieModel.findByIdAndUpdate(id, updated);
  }

  async deleteMovie(id: string): Promise<void> {
    // TODO: also delete referenced video from both DB and VOD servers.
    await this.movieModel.findByIdAndDelete(id);
  }

  private deleteExpiredMovie(id: string, expires: number): void {
    setTimeout(
      async () => {
        await this.deleteMovie(id);
        console.log(`movie id: ${id} expired and deleted.`); // DEBUG: make sure it works...
      },
      expires - Date.now()
    );
  }

}
