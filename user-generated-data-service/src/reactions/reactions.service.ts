import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
      if (reaction.movie) await this.moviesService.like(mediaId, { isChange: true });
      else await this.seriesService.like(mediaId, { isChange: true });
      await found.save();
      return;
    }

    if (reaction.movie) await this.moviesService.like(mediaId, { isChange: false });
    else await this.seriesService.like(mediaId, { isChange: false });
    await this.reactionModel.create({ userId, ...reaction, like: true });
  }

  async dislike(userId: string, reaction: ReactionDto): Promise<void> {
    const { mediaId } = reaction;

    const found: ReactionDocument = await this.reactionModel.findOne({ userId, mediaId });
    if (found) {
      if (!found.like) return;
      found.like = false;
      if (reaction.movie) await this.moviesService.dislike(mediaId, { isChange: true });
      else await this.seriesService.dislike(mediaId, { isChange: true });
      await found.save();
      return;
    }

    if (reaction.movie) await this.moviesService.dislike(mediaId, { isChange: false });
    else await this.seriesService.dislike(mediaId, { isChange: false });
    await this.reactionModel.create({ userId, ...reaction, like: false });
  }

  async getReactions(userId: string): Promise<Reaction[]> {
    return await this.reactionModel.find({ userId });
  }

  async getReaction(userId: string, id: string): Promise<Reaction> {
    const found: Reaction = await this.reactionModel.findOne({ userId, _id: id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async deleteReaction(userId: string, id: string): Promise<void> {
    const reaction: Reaction = await this.reactionModel.findOneAndDelete({ _id: id, userId });
    if (!reaction) throw new NotFoundException('reaction doesn\'t exists');

    const { movie, mediaId, like } = reaction;
    if (movie === undefined || !mediaId || like === undefined) {
      console.log(`reaction ${id} is corrupted.`);
      throw new InternalServerErrorException();
    }

    if (movie) await this.moviesService.removeReaction(mediaId, like);
    else await this.seriesService.removeReaction(mediaId, like);
  }

}
