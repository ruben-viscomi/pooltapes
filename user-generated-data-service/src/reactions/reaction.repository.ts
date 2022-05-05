import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reaction, ReactionDocument } from './reaction.model';
import { MoviesService } from '../movies/movies.service';
import { SeriesService } from '../series/series.service';

import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionRepository {

  constructor(
    @InjectModel(Reaction.name) public readonly model: Model<ReactionDocument>,
    private readonly moviesService: MoviesService,
    private readonly seriesService: SeriesService
  ) {}

  async changeReaction(reaction: ReactionDocument, updater: any): Promise<Reaction> {
    reaction.like = updater.like;
    await this.changeInServices({ ...updater, movie: reaction.movie }, true);
    await reaction.save();
    return reaction;
  }

  async createReaction(userId: string, reaction: any): Promise<Reaction> {
    await this.changeInServices(reaction, false);
    return await this.model.create({ userId, ...reaction });
  }

  private async changeInServices(updater: any, isChange: boolean): Promise<void> {
    const { movie, like, media } = updater;

    if (movie) {
      if (like) return await this.moviesService.like(media, { isChange });
      return await this.moviesService.dislike(media, { isChange });
    }

    if (like) return await this.seriesService.like(media, { isChange });
    return await this.seriesService.dislike(media, { isChange });
  }

}
