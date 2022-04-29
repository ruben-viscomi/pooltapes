import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Preferred, PreferredDocument } from './preferred.model';
import { Movie, MovieDocument } from '../movies/movie.model';
import { Series, SeriesDocument } from '../series/series.model';

import { PreferredDto } from './dto/preferred.dto';

@Injectable()
export class PreferredService {

  constructor(
    @InjectModel(Preferred.name) private readonly preferredModel: Model<PreferredDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>
  ) {}

  async createPreferred(userId: string, preferred: PreferredDto): Promise<void> {
    const foundPreferred: Preferred = await this.preferredModel.findOne({ ...preferred, userId });
    if (foundPreferred) throw new ConflictException('preferred already existing');
    await this.preferredModel.create({ ...preferred, userId });
  }

  async getAllPreferred(userId: string, movie:boolean): Promise<Preferred[]> {
    const query = { userId, movie };
    // if (movie !== undefined) Object.assign(query, { movie });
    const model: Model<Movie | Series> = movie ? this.movieModel : this.seriesModel;
    return await this.preferredModel.find(query).populate('mediaId', null, model);
    // TODO: perform sub-populate with video_id
  }

  async getPreferred(userId: string, id: string): Promise<Preferred> {
    const preferred: Preferred = await this.preferredModel.findOne({ _id: id, userId });
    if (!preferred) throw new NotFoundException('the requested preferred doesn\'t exists');
    return preferred;
  }

  async deletePreferred(userId: string, id: string): Promise<void> {
    const preferred: Preferred = await this.preferredModel.findOneAndDelete({ _id: id, userId });
    if (!preferred) throw new NotFoundException('the requested preferred doesn\'t exists');
  }

}
