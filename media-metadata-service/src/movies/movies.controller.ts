import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

  constructor(private moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() movie: any): any {
    return this.moviesService.createMovie(movie);
  }

  @Get()
  getMovies(@Query() query: any): any {
    return this.moviesService.getMovies(query);
  }

  @Get(':id')
  getMovie(@Param('id') id: string): any {
    return this.moviesService.getMovie(id);
  }

  @Patch(':id')
  updateMovie(@Param('id') id: string, @Body() updated: any): any {
    return this.moviesService.updateMovie(id, updated);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string): any {
    return this.moviesService.deleteMovie(id);
  }

}
