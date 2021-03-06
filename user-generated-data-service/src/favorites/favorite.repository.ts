import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';
import { Favorite, FavoriteDocument } from './favorite.model';

import { Media, MediaDocument } from '../media/media.model';

@Injectable()
export class FavoriteRepository extends EntityRepository<FavoriteDocument> {

  private readonly populator = {
    path: 'media',
    model: this.mediaModel,
    populate: {
      path: 'video seasons.episodes',
      model: 'Video',
      strictPopulate: false
    }
  };

  constructor(
    @InjectModel(Favorite.name) model: Model<FavoriteDocument>,
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
  ) {
    super(model);
  }

  async getPopulatedAll(query: any): Promise<Favorite[]> {
    return await this.entityModel.find(query).populate(this.populator).sort('-added');
  }

  async getPopulatedById(query: { _id: string, userId: string }): Promise<Favorite> {
    return await this.entityModel.findOne(query).populate(this.populator);
  }

}
