import { Controller, Post, Get, Body, Param, UseInterceptors } from '@nestjs/common';

import { ReactionsService } from './reactions.service';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserId } from '../decorators/user-id.decorator';

import { ReactionDto } from './dto/reaction.dto';

@Controller('reactions')
@UseInterceptors(UserInterceptor)
export class ReactionsController {

  constructor(private reactionsService: ReactionsService) {}

  @Post('like')
  async like(@UserId() userId: string, @Body() reaction: ReactionDto): Promise<void> {
    await this.reactionsService.like(userId, reaction);
  }

  @Post('dislike')
  async dislike(@UserId() userId: string, @Body() reaction: ReactionDto): Promise<void> {
    await this.reactionsService.dislike(userId, reaction);
  }

  @Get()
  async getReactions(@UserId() userId: string): Promise<any> {
    return await this.reactionsService.getReactions(userId);
  }

  @Get(':id')
  async getReaction(@UserId() userId: string, @Param('id') id: string): Promise<any> {
    return await this.reactionsService.getReaction(userId, id);
  }

}
