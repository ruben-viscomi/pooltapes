import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
import { IsAdminGuard } from '../guards/is-admin.guard';

import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

  constructor(private moviesService: MoviesService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  createMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(movie);
  }

  @Get()
  getMovies(@Query() query: QueryMoviesDto): Promise<Movie[]> {
    return this.moviesService.getMovies(query);
  }

  @Get(':id')
  getMovie(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovie(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  updateMovie(@Param('id') id: string, @Body() updated: UpdateMovieDto): Promise<void> {
    return this.moviesService.updateMovie(id, updated);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  deleteMovie(@Param('id') id: string): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }

}
