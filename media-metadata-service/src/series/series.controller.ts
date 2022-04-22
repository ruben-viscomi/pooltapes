import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './series.model';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { AllowRoles } from '../decorators/allow-roles.decorator';
import { Roles } from '../common/roles.enum';

import { CreateSeriesDto } from './dto/create-series.dto';
import { CreateSeasonDto } from './dto/create-season.dto';
import { QuerySeriesDto } from './dto/query-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Controller('series')
@UseGuards(IsAdminGuard)
export class SeriesController {

  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @AllowRoles(Roles.CONTENT)
  createSeries(@Body() series: CreateSeriesDto): Promise<Series> {
    return this.seriesService.createSeries(series);
  }

  @Post(':id/seasons')
  @AllowRoles(Roles.CONTENT)
  addSeason(@Param('id') id: string, @Body() season: CreateSeasonDto): Promise<void> {
    return this.seriesService.addSeason(id, season);
  }

  @Get()
  @UseGuards(IsLoggedGuard)
  getSeries(@Query() query: QuerySeriesDto): Promise<Series[]> {
    return this.seriesService.getSeries(query);
  }

  @Get(':id')
  @UseGuards(IsLoggedGuard)
  getSeriesById(@Param('id') id: string): Promise<Series> {
    return this.seriesService.getSeriesById(id);
  }

  @Patch(':id')
  @AllowRoles(Roles.CONTENT)
  updateSeries(@Param('id') id: string, @Body() updated: UpdateSeriesDto): Promise<void> {
    return this.seriesService.updateSeries(id, updated);
  }

  @Delete(':id')
  @AllowRoles(Roles.CONTENT)
  deleteSeries(@Param('id') id: string): Promise<void> {
    return this.seriesService.deleteSeries(id);
  }

}
