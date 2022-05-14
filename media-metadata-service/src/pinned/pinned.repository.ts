import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';

import { Pinned, PinnedDocument } from './pinned.model';
import { Media, MediaDocument } from '../media/media.model';

export class PinnedRepository extends EntityRepository<PinnedDocument> {

  private readonly populator = {
    path: 'media',
    model: this.mediaModel,
    populate: {
      path: 'video seasons.episodes',
      model: 'Video'
    }
  };

  constructor(
    @InjectModel(Pinned.name) model: Model<PinnedDocument>,
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>
  ) {
    super(model);
  }

  async createPinSection(section: string): Promise<Pinned> {
    return await this.entityModel.create({ section });
  }

  async getPopulated(section: string): Promise<Pinned> {
    return await this.entityModel.findOne({ section }).populate(this.populator);
  }

}
