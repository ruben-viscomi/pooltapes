import { Controller, Post, Get, Delete, Body, Param, UseInterceptors, UseGuards } from '@nestjs/common';

import { ReactionsService } from './reactions.service';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { IsUserGuard } from '../guards/is-user.guard';
import { UserId } from '../decorators/user-id.decorator';
import { Reaction } from './reaction.model';

import { ReactionDto } from './dto/reaction.dto';

@Controller('reactions')
@UseGuards(IsUserGuard)
@UseInterceptors(UserInterceptor)
export class ReactionsController {

  constructor(private readonly reactionsService: ReactionsService) {}

  @Post('like')
  async like(@UserId() userId: string, @Body() reaction: ReactionDto): Promise<Reaction> {
    return await this.reactionsService.like(userId, reaction);
  }

  @Post('dislike')
  async dislike(@UserId() userId: string, @Body() reaction: ReactionDto): Promise<Reaction> {
    return await this.reactionsService.dislike(userId, reaction);
  }

  @Get()
  async getReactions(@UserId() userId: string): Promise<Reaction[]> {
    return await this.reactionsService.getReactions(userId);
  }

  @Get(':id')
  async getReaction(@UserId() userId: string, @Param('id') id: string): Promise<Reaction> {
    return await this.reactionsService.getReaction(userId, id);
  }

  @Delete(':id')
  async deleteReaction(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.reactionsService.deleteReaction(userId, id);
  }

}
