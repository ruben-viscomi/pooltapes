import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { PinnedRepository } from './pinned.repository';
import { Pinned, PinnedDocument } from './pinned.model';

@Injectable()
export class PinnedService {

  private get pinnedModel(): Model<PinnedDocument> { return this.pinnedRepo.model }

  constructor(private readonly pinnedRepo: PinnedRepository) {}

  createPinSection(section: string): void {}

  pinTo(section: string, media: string[]): void {}

}
