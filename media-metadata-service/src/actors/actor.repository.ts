import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';

import { Actor, ActorDocument } from './actor.model';

@Injectable()
export class ActorRepository extends EntityRepository<ActorDocument> {

  constructor(@InjectModel(Actor.name) model: Model<ActorDocument>) {
    super(model);
  }

  async findAndLimit(query: any): Promise<Actor[]> {
    const { from, limit } = this.getLimitsFromQuery(query);
    return this.entityModel.find(query).skip(from).limit(limit).exec();
  }

  private getLimitsFromQuery(query: any): { from: number, limit: number } {
    const { from, limit } = query;
    delete query.from; delete query.limit;
    return { from, limit };
  }

}
