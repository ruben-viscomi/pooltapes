import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';
import { Admin, AdminDocument } from './admin.model';

@Injectable()
export class AdminRepository extends EntityRepository<AdminDocument> {

  constructor(@InjectModel(Admin.name) model: Model<AdminDocument>) {
    super(model);
  }

}
