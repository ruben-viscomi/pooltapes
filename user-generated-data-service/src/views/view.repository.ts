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

  async max(query: any, field: string): Promise<ViewDocument> {
    return (await this.entityModel.find(query).sort({ [field]: -1 }).limit(1))[0];
  }

}
