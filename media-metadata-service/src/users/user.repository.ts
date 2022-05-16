import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';

import { User, UserDocument } from './user.model';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {

  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }

}
