import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Actor, ActorDocument } from './actor.model';

import { CreateActorDto } from './dto/create-actor.dto';
import { QueryActorsDto } from './dto/query-actors.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorsService {

  constructor(@InjectModel(Actor.name) private readonly actorModel: Model<ActorDocument>) {}

  async createActor(actor: CreateActorDto): Promise<Actor> {
    return await this.actorModel.create({ ...actor, search: actor.name.split(' ') });
  }

  async getActors(query: QueryActorsDto): Promise<Actor[]> {
    var dbQuery = {};
    const limit: number = query.limit ? query.limit : 25;
    const from: number = query.from ? query.from : 0;
    var search = query.search;
    if (search) {
      search.replace(/\s/g, '\\s');
      dbQuery = { name: { $regex: `^${search}`, $options: 'i' } };
    }
    return await this.actorModel.find(dbQuery).skip(from).limit(limit);
    // TODO: in case returned actors length < 'limit', perform 2nd pass using split 'search' in 'actor.search'
  }

  async getActor(id: string): Promise<Actor> {
    const foundActor: Actor = await this.actorModel.findById(id);
    if (!foundActor) throw new NotFoundException();
    return foundActor;
  }

  async updateActor(id: string, updated: UpdateActorDto): Promise<void> {
    const { name } = updated;
    if (name) Object.assign(updated, { search: name.split(' ') });
    await this.actorModel.findByIdAndUpdate(id, updated);
  }

  async deleteActor(id: string): Promise<void> {
    await this.actorModel.findByIdAndDelete(id);
  }

}
