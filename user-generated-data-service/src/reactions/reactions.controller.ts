import { Controller, Post, Get, Param, UseInterceptors } from '@nestjs/common';

import { ReactionsService } from './reactions.service';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserId } from '../decorators/user-id.decorator';

@Controller('reactions')
@UseInterceptors(UserInterceptor)
export class ReactionsController {

  constructor(private reactionsService: ReactionsService) {}

  @Post('like/:mediaId')
  async like(@UserId() userId: string, @Param('mediaId') mediaId: string): Promise<void> {
    await this.reactionsService.like(userId, mediaId);
  }

  @Post('dislike/:mediaId')
  async dislike(@UserId() userId: string, @Param('mediaId') mediaId: string): Promise<void> {
    await this.reactionsService.dislike(userId, mediaId);
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
