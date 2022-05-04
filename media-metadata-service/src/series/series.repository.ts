import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Series, SeriesDocument } from './series.model';

export class SeriesRepository {

  constructor(@InjectModel(Series.name) public readonly model: Model<SeriesDocument>) {}

  async getPopulatedAll(query: any): Promise<Series[]> {
    const { from, limit } = this.getLimitsFromQuery(query);
    return await this.model.find(query).populate('seasons.episodes').skip(from).limit(limit);
  }

  async getPopulatedById(id: string): Promise<Series> {
    return await this.model.findById(id).populate('seasons.episodes');
  }

  private getLimitsFromQuery(query: any): { from: number, limit: number } {
    const { from, limit } = query;
    delete query.from; delete query.limit;
    return { from, limit };
  }

}
