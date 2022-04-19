import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { AllowRoles } from '../decorators/allow-roles.decorator';
import { Roles } from '../common/roles.enum';

import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
@UseGuards(IsAdminGuard)
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @AllowRoles(Roles.CONTENT)
  createMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(movie);
  }

  @Get()
  @UseGuards(IsLoggedGuard)
  getMovies(@Query() query: QueryMoviesDto): Promise<Movie[]> {
    return this.moviesService.getMovies(query);
  }

  @Get(':id')
  @UseGuards(IsLoggedGuard)
  getMovie(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovie(id);
  }

  @Patch(':id')
  @AllowRoles(Roles.CONTENT)
  updateMovie(@Param('id') id: string, @Body() updated: UpdateMovieDto): Promise<void> {
    return this.moviesService.updateMovie(id, updated);
  }

  @Delete(':id')
  @AllowRoles(Roles.CONTENT)
  deleteMovie(@Param('id') id: string): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }

}
