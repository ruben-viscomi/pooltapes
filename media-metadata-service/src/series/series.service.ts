import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Series, SeriesDocument } from './series.model';

import { CreateSeriesDto } from './dto/create-series.dto';
import { CreateSeasonDto } from './dto/create-season.dto';
import { QuerySeriesDto } from './dto/query-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {

  constructor(@InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>) {}

  async createSeries(series: CreateSeriesDto): Promise<Series> {
    if (series.expires <= Date.now()) throw new BadRequestException('Series can\'t expire at creation time');
    const initialization = {
      search: series.title.split(' '),
      uploaded: Date.now(),
      views: 0, likes: 0, dislikes: 0,
      cast: [], series: []
    };
    const created: Series = await this.seriesModel.create({ ...series, ...initialization });
    if (created.expires) this.deleteExpiredSeries(created._id, created.expires);
    return created;
  }

  async addSeason(id: string, season: CreateSeasonDto): Promise<void> {
    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    for (let foundSeason of foundSeries.seasons) {
      if (foundSeason.season === season.season)
        throw new ConflictException('season already exists');
    }
    foundSeries.seasons.push(season);
    await foundSeries.save();
  }

  async getSeries(query: QuerySeriesDto): Promise<Series[]> {
    var dbQuery = {};
    const limit: number = query.limit ? query.limit : 25;
    const from: number = query.from ? query.from : 0;
    var search = query.search;
    if (search) {
      search.replace(/\s/g, '\\s');
      dbQuery = { title: { $regex: `^${search}`, $options: 'i' } };
    }
    return await this.seriesModel.find(dbQuery).skip(from).limit(limit);
    // TODO: in case returned series length < 'limit', perform 2nd pass using split 'search' in 'series.search'
  }

  async getSeriesById(id: string): Promise<Series> {
    const foundSeries: Series = await this.seriesModel.findById(id);
    if (!foundSeries) throw new NotFoundException();
    return foundSeries;
  }

  async updateSeries(id: string, updated: UpdateSeriesDto): Promise<void> {
    const { expires, title } = updated;
    if (expires <= Date.now()) throw new BadRequestException('Series can\'t expire at updation time');
    if (title) Object.assign(updated, { search: title.split(' ') });
    await this.seriesModel.findByIdAndUpdate(id, updated);
  }

  async deleteSeries(id: string): Promise<void> {
    // TODO: also delete referenced video from both DB and VOD servers.
    await this.seriesModel.findByIdAndDelete(id);
  }

  private deleteExpiredSeries(id: string, expires: number): void {
    setTimeout(
      async () => {
        await this.deleteSeries(id);
        console.log(`series id: ${id} expired and deleted.`); // DEBUG: make sure it works...
      },
      expires - Date.now()
    );
  }

}
