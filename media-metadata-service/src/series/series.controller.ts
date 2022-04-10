import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './series.model';

import { CreateSeriesDto } from './dto/create-series.dto';
import { QuerySeriesDto } from './dto/query-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Controller('series')
export class SeriesController {

  constructor(private seriesService: SeriesService) {}

  @Post()
  createSeries(@Body() series: CreateSeriesDto): Promise<Series> {
    return this.seriesService.createSeries(series);
  }

  @Get()
  getSeries(@Query() query: QuerySeriesDto): Promise<Series[]> {
    return this.seriesService.getSeries(query);
  }

  @Get(':id')
  getSeriesById(@Param('id') id: string): Promise<Series> {
    return this.seriesService.getSeriesById(id);
  }

  @Patch(':id')
  updateSeries(@Param('id') id: string, @Body() updated: UpdateSeriesDto): Promise<void> {
    return this.seriesService.updateSeries(id, updated);
  }

  @Delete(':id')
  deleteSeries(@Param('id') id: string): Promise<void> {
    return this.seriesService.deleteSeries(id);
  }

}
