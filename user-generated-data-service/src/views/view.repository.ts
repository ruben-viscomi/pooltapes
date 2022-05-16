import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';
import { View, ViewDocument } from './view.model';

@Injectable()
export class ViewRepository extends EntityRepository<ViewDocument> {

  constructor(@InjectModel(View.name) model: Model<ViewDocument>) {
    super(model);
  }

}
