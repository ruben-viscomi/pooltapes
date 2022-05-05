import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { MovieRepository } from './movie.repository';
import { Movie, MovieDocument } from './movie.model';

import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {

  private get movieModel(): Model<MovieDocument> { return this.movieRepo.model }

  constructor(private readonly movieRepo: MovieRepository) {}

  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    if (movie.expires <= Date.now()) throw new BadRequestException('Movies can\'t expire at creation time');

    const initialization = { search: movie.title.split(' ') };
    const created: Movie = await this.movieModel.create({ ...movie, ...initialization });

    if (created.expires) this.deleteExpiredMovie(created._id, created.expires);
    return created;
  }

  async getMovies(query: QueryMoviesDto): Promise<Movie[]> {
    var { search } = query;

    if (search) {
      search.replace(/\s/g, '\\s');
      Object.assign(query, { title: { $regex: `^${search}`, $options: 'i' } });
      delete query.search;
    }

    return await this.movieRepo.getPopulatedAll(query);
    // TODO: in case returned movies length < 'limit', perform 2nd pass using split 'search' in 'movie.search'
  }

  async getMovie(id: string): Promise<Movie> {
    const foundMovie: Movie = await this.movieRepo.getPopulatedById(id);
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
