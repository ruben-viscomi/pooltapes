import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';

import { Media,  MediaDocument } from '../media/media.model';
import { Series, SeriesDocument, SeriesSchema } from './series.model';

export class SeriesRepository extends EntityRepository<SeriesDocument> {

  public entityModel: Model<SeriesDocument>;

  constructor(@InjectModel(Media.name) mediaModel: Model<MediaDocument>) {
    super(mediaModel.discriminator(Series.name, SeriesSchema));
  }

  async getPopulatedAll(query: any): Promise<Series[]> {
    const { from, limit } = this.getLimitsFromQuery(query);
    return await this.entityModel.find(query).populate('seasons.episodes').skip(from).limit(limit);
  }

  async getPopulatedById(id: string): Promise<Series> {
    return await this.entityModel.findById(id).populate('seasons.episodes');
  }

  private getLimitsFromQuery(query: any): { from: number, limit: number } {
    const { from, limit } = query;
    delete query.from; delete query.limit;
    return { from, limit };
  }

}
