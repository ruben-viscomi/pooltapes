import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reaction, ReactionDocument } from './reaction.model';

import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {

  constructor(@InjectModel(Reaction.name) private reactionModel: Model<ReactionDocument>) {}

  async like(userId: string, reaction: ReactionDto): Promise<void> {
    const { mediaId } = reaction;
    const found: ReactionDocument = await this.reactionModel.findOne({ userId, mediaId });
    if (found) {
      if (found.like) return;
      found.like = true;
      found.save();
      return;
    }
    await this.reactionModel.create({ userId, ...reaction, like: true });
  }

  async dislike(userId: string, reaction: ReactionDto): Promise<void> {
    const { mediaId } = reaction;
    const found: ReactionDocument = await this.reactionModel.findOne({ userId, mediaId });
    if (found) {
      if (!found.like) return;
      found.like = false;
      found.save();
      return;
    }
    await this.reactionModel.create({ userId, ...reaction, like: false });
  }

  async getReactions(userId: string): Promise<any> {
    return await this.reactionModel.find({ userId });
  }

  async getReaction(userId: string, id: string): Promise<any> {
    const found: Reaction = await this.reactionModel.findOne({ userId, _id: id });
    if (!found) throw new NotFoundException();
    return found;
  }

}
