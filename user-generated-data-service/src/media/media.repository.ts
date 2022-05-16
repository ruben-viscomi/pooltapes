import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';
import { Media, MediaDocument } from './media.model';

export class MediaRepository extends EntityRepository<MediaDocument> {

  constructor(@InjectModel(Media.name) model: Model<MediaDocument>) {
    super(model);
  }
  
}
