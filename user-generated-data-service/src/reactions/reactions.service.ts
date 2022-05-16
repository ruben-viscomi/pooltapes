import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ReactionRepository } from './reaction.repository';
import { Reaction, ReactionDocument } from './reaction.model';
import { MediaService } from '../media/media.service';

import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {

  constructor(
    private readonly reactionRepo: ReactionRepository,
    private readonly mediaService: MediaService
  ) {}

  async like(userId: string, reaction: ReactionDto): Promise<Reaction> {
    const { media } = reaction;

    const found: ReactionDocument = await this.reactionRepo.findOne({ userId, media });
    if (found) {
      if (found.like) throw new ConflictException('media already liked');
      return await this.reactionRepo.changeReaction(found, { media, like: true });
    }

    return await this.reactionRepo.createReaction(userId, { ...reaction, like: true });
  }

  async dislike(userId: string, reaction: ReactionDto): Promise<Reaction> {
    const { media } = reaction;

    const found: ReactionDocument = await this.reactionRepo.findOne({ userId, media });
    if (found) {
      if (!found.like) throw new ConflictException('media already disliked');
      return await this.reactionRepo.changeReaction(found, { media, like: false });
    }

    return await this.reactionRepo.createReaction(userId, { ...reaction, like: false });
  }

  async getReactions(userId: string): Promise<Reaction[]> {
    return await this.reactionRepo.find({ userId });
  }

  async getReaction(userId: string, id: string): Promise<Reaction> {
    const found: Reaction = await this.reactionRepo.findOne({ userId, _id: id });
    if (!found) throw new NotFoundException('reaction doesn\'t exists');
    return found;
  }

  async deleteReaction(userId: string, id: string): Promise<void> {
    const reaction: Reaction = await this.reactionRepo.findOneAndDelete({ _id: id, userId });
    if (!reaction) throw new NotFoundException('reaction doesn\'t exists');

    const { media, like } = reaction;
    if (!media || like === undefined) {
      console.log(`reaction ${id} is corrupted.`);
      throw new InternalServerErrorException('reaction is corrupt');
    }

    await this.mediaService.removeReaction(media, like);
  }

}
