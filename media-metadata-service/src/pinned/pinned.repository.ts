import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pinned, PinnedDocument } from './pinned.model';

export class PinnedRepository {

  constructor(@InjectModel(Pinned.name) public readonly model: Model<PinnedDocument>) {}

  async createPinSection(section: string): Promise<Pinned> {
    const found: Pinned = await this.model.findOne({ section });
    if (found) return undefined;
  }

}
