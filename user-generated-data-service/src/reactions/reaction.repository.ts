import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityRepository } from '../common/entity.repository';
import { Reaction, ReactionDocument } from './reaction.model';
import { MediaService } from '../media/media.service';

import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionRepository extends EntityRepository<ReactionDocument> {

  constructor(
    @InjectModel(Reaction.name) entityModel: Model<ReactionDocument>,
    private readonly mediaService: MediaService
  ) {
    super(entityModel);
  }

  async changeReaction(reaction: ReactionDocument, updater: any): Promise<Reaction> {
    reaction.like = updater.like;
    await this.changeInMedia(updater, true);
    await reaction.save();
    return reaction;
  }

  async createReaction(userId: string, reaction: any): Promise<Reaction> {
    await this.changeInMedia(reaction, false);
    return await this.entityModel.create({ userId, ...reaction });
  }

  private async changeInMedia(updater: any, isChange: boolean): Promise<void> {
    const { like, media } = updater;

    if (like) return await this.mediaService.like(media, { isChange });
    return await this.mediaService.dislike(media, { isChange });
  }

}
