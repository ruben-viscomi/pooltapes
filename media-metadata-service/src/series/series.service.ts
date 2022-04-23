import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Series, SeriesDocument } from './series.model';
import { VideosService } from '../videos/videos.service';
import { Season } from './season.type';

import { CreateSeriesDto } from './dto/create-series.dto';
import { CreateSeasonDto } from './dto/create-season.dto';
import { QuerySeriesDto } from './dto/query-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {

  constructor(
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>,
    private readonly videosService: VideosService
  ) {}

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
    if (!season.episodes) Object.assign(season, { episodes: [] });
    foundSeries.seasons.push(season);
    await foundSeries.save();
  }

  async addEpisodes(id: string, season: number, episodes: string[]): Promise<void> {
    if (season <= 0) throw new BadRequestException('season must be greater than 0');
    if (!await this.videosService.checkVideos(episodes)) throw new NotFoundException('can\'t add non existing videos');

    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    if (!foundSeries) throw new NotFoundException();
    if (!foundSeries.seasons.length) throw new NotFoundException('no season found');
    if (this.duplicateEpisodes(foundSeries.seasons, episodes)) throw new BadRequestException('one or more episodes already existing');

    for (let foundSeason of foundSeries.seasons) {
      if (foundSeason.season === season) {
        foundSeason.episodes.push(...episodes);
        await foundSeries.save();
        return;
      }
    }
    throw new BadRequestException('can\'t add videos to a non existing season');
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

  duplicateEpisodes(seasons: Season[], episodes: string[]): boolean {
    var allEpisodes: string[] = seasons[0].episodes;
    for (let i = 1; i < seasons.length; i++)
      allEpisodes.push(...seasons[i].episodes);

    for (let episode of episodes) {
      for (let existingEpisode of allEpisodes)
        if (episode === existingEpisode) return true;
    }
    return false;
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
