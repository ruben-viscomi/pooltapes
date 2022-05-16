import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';

import { Category, CategoryDocument } from './category.model';
import { Media, MediaDocument } from '../media/media.model';

@Injectable()
export class CategoryRepository extends EntityRepository<CategoryDocument> {

  private readonly populator = {
    path: 'media',
    model: this.mediaModel,
    populate: {
      path: 'video seasons.episodes',
      model: 'Video'
    }
  };

  constructor(
    @InjectModel(Category.name) model: Model<CategoryDocument>,
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>
  ) {
    super(model);
  }

  async getPopulatedAll(query: any): Promise<Category[]> {
    const { movie, dash } = query;
    if (dash !== undefined)
      var dashType: number = dash.$elemMatch.type;
    const { from, limit } = this.getLimitsFromQuery(query);

    if (dash !== undefined)
      return await this.entityModel.find(query).skip(from).limit(limit)
        .populate(this.populator).sort(`dash.${dashType}.position`);

    return this.entityModel.find(query).skip(from).limit(limit)
      .populate(this.populator);
  }

  async getPopulatedById(id: string): Promise<Category> {
    return await this.entityModel.findById(id).populate(this.populator);
  }

  private getLimitsFromQuery(query: any): { from: number, limit: number } {
    const { from, limit } = query;
    delete query.from; delete query.limit;
    return { from, limit };
  }

}
