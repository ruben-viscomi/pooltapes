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
import { UpdateSeasonDto } from './dto/update-season.dto';
import { UpdateEpisodesDto } from './dto/update-episodes.dto';

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
    if (!foundSeries) throw new NotFoundException('series doesn\'t exists');

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
    if (!await this.videosService.checkVideos(episodes))
      throw new NotFoundException('can\'t add non existing videos');

    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    const foundSeason: Season = foundSeries.seasons[this.getSeasonIndex(foundSeries, season)];
    if (this.areDuplicatedEpisodes(foundSeries.seasons, episodes))
      throw new BadRequestException('one or more episodes already existing');
    foundSeason.episodes.push(...episodes);
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

  async updateSeason(id: string, season: number, updated: UpdateSeasonDto): Promise<void> {
    if (season <= 0) throw new BadRequestException('season must be greater than 0');
    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    const foundSeason: Season = foundSeries.seasons[this.getSeasonIndex(foundSeries, season)];
    Object.assign(foundSeason, updated);
    await foundSeries.save();
  }

  async updateEpisodes(id: string, season: number, updateEpisodes: UpdateEpisodesDto): Promise<void> {
    if (season <= 0) throw new BadRequestException('season must be greater than 0');
    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    const foundSeason: Season = foundSeries.seasons[this.getSeasonIndex(foundSeries, season)];

    const { episodes } = updateEpisodes;
    const numbers: number[] = episodes.map((ep: any) => ep.episodeNumber);
    if (!this.areValidEpisodeNumbers(foundSeason.episodes.length, numbers))
      throw new BadRequestException('invalid episode/s');

    const episodeIds: string[] = episodes.map((ep: any) => ep.episodeId);
    if (!await this.videosService.checkVideos(episodeIds))
      throw new NotFoundException('can\'t update with non existing videos');

    // UNDONE: it would have blocked wanted duplication (in case of cross-substitution)
    // if (this.areDuplicatedEpisodes(foundSeries.seasons, episodeIds))
      // throw new BadRequestException('one or more episodes already existing');

    for (let index = 0; index < episodes.length; index++) {
      console.log(episodeIds[index]);
      foundSeason.episodes[numbers[index] - 1] = episodeIds[index];
    }
    await foundSeries.save();
  }

  async deleteSeries(id: string): Promise<void> {
    // TODO: also delete referenced video from both DB and VOD servers.
    await this.seriesModel.findByIdAndDelete(id);
  }

  async deleteSeason(id: string, season: number): Promise<void> {
    if (season <= 0) throw new BadRequestException('season must be greater than 0');
    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    foundSeries.seasons.splice(this.getSeasonIndex(foundSeries, season), 1);
    await foundSeries.save();
  }

  async deleteEpisodes(id: string, season: number, episodes: number[]): Promise<void> {
    if (season <= 0) throw new BadRequestException('season must be greater than 0');
    const foundSeries: SeriesDocument = await this.seriesModel.findById(id);
    const foundSeason: Season = foundSeries.seasons[this.getSeasonIndex(foundSeries, season)];

    episodes = [...new Set(episodes)];
    if (!this.areValidEpisodeNumbers(foundSeason.episodes.length, episodes))
      throw new BadRequestException('invalid episode/s');

    var updated: boolean = false;
    for (let episode of episodes) {
      if (foundSeason.episodes[episode - 1] !== '') {
        foundSeason.episodes[episode - 1] = '';
        updated = true;
      }
    }
    if (updated) await foundSeries.save();
    // TODO: may want to delete from videosService.
  }

  areDuplicatedEpisodes(seasons: Season[], episodes: string[]): boolean {
    var allEpisodes: string[] = seasons[0].episodes;
    for (let i = 1; i < seasons.length; i++)
      allEpisodes.push(...seasons[i].episodes);

    for (let episode of episodes) {
      for (let existingEpisode of allEpisodes)
        if (episode === existingEpisode) return true;
    }
    return false;
  }

  areValidEpisodeNumbers(episodeNumber: number, episodes: number[]): boolean {
    for (let ep of episodes) {
      if (ep <= 0 !== ep > episodeNumber)
        return false;
    }
    return true;
  }

  getSeasonIndex(series: SeriesDocument | Series, season: number): number {
    if (!series) throw new NotFoundException('series doesn\'t exists');
    if (!series.seasons.length) throw new NotFoundException('no season found');
    for (let index = 0; index < series.seasons.length; index++) {
      if (series.seasons[index].season === season)
        return index;
    }
    throw new NotFoundException('season doesn\'t exists');
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
