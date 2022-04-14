import { Controller, Post, Get, Param, UseInterceptors } from '@nestjs/common';

import { ReactionsService } from './reactions.service';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserId } from '../decorators/user-id.decorator';

@Controller('reactions')
@UseInterceptors(UserInterceptor)
export class ReactionsController {

  constructor(private reactionsService: ReactionsService) {}

  @Post('like')
  async like(@UserId() userId: string): Promise<void> {
    await this.reactionsService.like(userId);
  }

  @Post('dislike')
  async dislike(@UserId() userId: string): Promise<void> {
    await this.reactionsService.dislike(userId);
  }

  @Get('')
  async getReactions(@UserId() userId: string): Promise<any> {
    return await this.reactionsService.getReactions(userId);
  }

  @Get(':id')
  async getReaction(@UserId() userId: string, @Param('id') id: string): Promise<any> {
    return await this.reactionsService.getReaction(userId, id);
  }

}
