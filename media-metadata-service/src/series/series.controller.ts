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
import { UpdateSeasonDto } from './dto/update-season.dto';

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

  @Post(':id/seasons/:season/episodes')
  @AllowRoles(Roles.CONTENT)
  addEpisodes(@Param('id') id: string, @Param('season') season: number, @Body() episodes: string[]): Promise<void> {
    return this.seriesService.addEpisodes(id, season, episodes);
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

  @Patch(':id/seasons/:season')
  updateSeason(@Param('id') id: string, @Param('season') season: number, @Body() updated: UpdateSeasonDto): Promise<void> {
    return this.seriesService.updateSeason(id, season, updated);
  }

  @Delete(':id')
  @AllowRoles(Roles.CONTENT)
  deleteSeries(@Param('id') id: string): Promise<void> {
    return this.seriesService.deleteSeries(id);
  }

  @Delete(':id/seasons/:season')
  @AllowRoles(Roles.CONTENT)
  deleteSeason(@Param('id') id: string, @Param('season') season: number): Promise<void> {
    return this.seriesService.deleteSeason(id, season);
  }

  @Delete(':id/seasons/:season/episodes')
  @AllowRoles(Roles.CONTENT)
  deleteEpisodes(@Param('id') id: string, @Param('season') season: number, @Body() episodes: number[]): Promise<void> {
    return this.seriesService.deleteEpisodes(id, season, episodes);
  }

}
