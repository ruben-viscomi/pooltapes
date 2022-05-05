import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ReactionRepository } from './reaction.repository';
import { Reaction, ReactionDocument } from './reaction.model';
import { MoviesService } from '../movies/movies.service';
import { SeriesService } from '../series/series.service';

import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {

  private get reactionModel(): Model<ReactionDocument> { return this.reactionRepo.model }

  constructor(
    // @InjectModel(Reaction.name) private readonly reactionModel: Model<ReactionDocument>,
    private readonly moviesService: MoviesService,
    private readonly seriesService: SeriesService,
    private readonly reactionRepo: ReactionRepository
  ) {}

  async like(userId: string, reaction: ReactionDto): Promise<Reaction> {
    const { media } = reaction;

    const found: ReactionDocument = await this.reactionModel.findOne({ userId, media });
    if (found) {
      if (found.like) throw new ConflictException();
      return await this.reactionRepo.changeReaction(found, { media, like: true });
    }

    return await this.reactionRepo.createReaction(userId, { ...reaction, like: true });
  }

  async dislike(userId: string, reaction: ReactionDto): Promise<Reaction> {
    const { media } = reaction;

    const found: ReactionDocument = await this.reactionModel.findOne({ userId, media });
    if (found) {
      if (!found.like) throw new ConflictException();
      return await this.reactionRepo.changeReaction(found, { media, like: false });
    }

    return await this.reactionRepo.createReaction(userId, { ...reaction, like: false });
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
