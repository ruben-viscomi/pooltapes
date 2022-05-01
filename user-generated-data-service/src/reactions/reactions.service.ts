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
    @InjectModel(Reaction.name) private readonly reactionModel: Model<ReactionDocument>,
    private readonly moviesService: MoviesService,
    private readonly seriesService: SeriesService
  ) {}

  async like(userId: string, reaction: ReactionDto): Promise<void> {
    const { media } = reaction;

    const found: ReactionDocument = await this.reactionModel.findOne({ userId, media });
    if (found) {
      if (found.like) return;
      found.like = true;
      if (reaction.movie) await this.moviesService.like(media, { isChange: true });
      else await this.seriesService.like(media, { isChange: true });
      await found.save();
      return;
    }

    if (reaction.movie) await this.moviesService.like(media, { isChange: false });
    else await this.seriesService.like(media, { isChange: false });
    await this.reactionModel.create({ userId, ...reaction, like: true });
  }

  async dislike(userId: string, reaction: ReactionDto): Promise<void> {
    const { media } = reaction;

    const found: ReactionDocument = await this.reactionModel.findOne({ userId, media });
    if (found) {
      if (!found.like) return;
      found.like = false;
      if (reaction.movie) await this.moviesService.dislike(media, { isChange: true });
      else await this.seriesService.dislike(media, { isChange: true });
      await found.save();
      return;
    }

    if (reaction.movie) await this.moviesService.dislike(media, { isChange: false });
    else await this.seriesService.dislike(media, { isChange: false });
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

    const { movie, media, like } = reaction;
    if (movie === undefined || !media || like === undefined) {
      console.log(`reaction ${id} is corrupted.`);
      throw new InternalServerErrorException();
    }

    if (movie) await this.moviesService.removeReaction(media, like);
    else await this.seriesService.removeReaction(media, like);
  }

}
