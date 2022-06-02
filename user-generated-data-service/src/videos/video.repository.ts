import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';

import { Video, VideoDocument } from './video.model';

@Injectable()
export class VideoRepository extends EntityRepository<VideoDocument> {

  constructor(@InjectModel(Video.name) model: Model<VideoDocument>) {
    super(model);
  }

}
