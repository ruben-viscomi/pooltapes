import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reaction, ReactionDocument } from './reaction.model';
import { MoviesService } from '../movies/movies.service';
import { SeriesService } from '../series/series.service';

import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {

  constructor(
    @InjectModel(Reaction.name) private reactionModel: Model<ReactionDocument>,
    private moviesService: MoviesService,
    private seriesService: SeriesService
  ) {}

  async like(userId: string, reaction: ReactionDto): Promise<void> {
    const { mediaId } = reaction;
    const found: ReactionDocument = await this.reactionModel.findOne({ userId, mediaId });
    if (found) {
      if (found.like) return;
      found.like = true;
      await found.save();
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
      await found.save();
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
