import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { ActorRepository } from './actor.repository';
import { Actor, ActorDocument } from './actor.model';

import { CreateActorDto } from './dto/create-actor.dto';
import { QueryActorsDto } from './dto/query-actors.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorsService {

  constructor(private readonly actorRepo: ActorRepository) {}

  async createActor(actor: CreateActorDto): Promise<Actor> {
    return await this.actorRepo.create({ ...actor, search: actor.name.split(' ') });
  }

  async getActors(query: QueryActorsDto): Promise<Actor[]> {
    var search = query.search;
    if (search) {
      search.replace(/\s/g, '\\s');
      Object.assign(query, { name: { $regex: `^${search}`, $options: 'i' } });
      delete query.search;
    }
    return await this.actorRepo.findAndLimit(query);
    // TODO: in case returned actors length < 'limit', perform 2nd pass using split 'search' in 'actor.search'
  }

  async getActor(id: string): Promise<Actor> {
    const foundActor: Actor = await this.actorRepo.findById(id);
    if (!foundActor) throw new NotFoundException();
    return foundActor;
  }

  async updateActor(id: string, updated: UpdateActorDto): Promise<void> {
    const { name } = updated;
    if (name) Object.assign(updated, { search: name.split(' ') });
    await this.actorRepo.findByIdAndUpdate(id, updated);
  }

  async deleteActor(id: string): Promise<void> {
    await this.actorRepo.findByIdAndDelete(id);
  }

}
