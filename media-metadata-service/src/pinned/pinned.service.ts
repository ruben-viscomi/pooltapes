import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { PinnedRepository } from './pinned.repository';
import { Pinned, PinnedDocument } from './pinned.model';

import { UpdatePinsDto } from './dto/update-pins.dto';

@Injectable()
export class PinnedService {

  private get pinnedModel(): Model<PinnedDocument> { return this.pinnedRepo.model }

  constructor(private readonly pinnedRepo: PinnedRepository) {}

  async createPinSection(section: string): Promise<Pinned> {
    const created: Pinned = await this.pinnedRepo.createPinSection(section);
    if (!created) throw new ConflictException();
    return created;
  }

  async pinTo(section: string, updatePins: UpdatePinsDto): Promise<void> {
    const { toPush, toPull } = updatePins;
    var updater = {};
    if (toPush) updater = { $push: { media: { $each: toPush } } };
    if (toPull) updater = { $pull: { media: { $in: toPull } }, ...updater };
    await this.pinnedModel.updateOne({ section }, updater);
  }

  async getPins(section: string): Promise<Pinned> {
    const found: Pinned = await this.pinnedRepo.getPopulated(section);
    if (!found) throw new NotFoundException();
    return found;
  }

}