import { Controller, Post, Get, Param } from '@nestjs/common';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {

  constructor(private reactionsService: ReactionsService) {}

  @Post('like')
  async like(): Promise<void> {
    await this.reactionsService.like();
  }

  @Post('dislike')
  async dislike(): Promise<void> {
    await this.reactionsService.dislike();
  }

  @Get('')
  async getReactions(): Promise<any> {
    return await this.reactionsService.getReactions();
  }

  @Get(':id')
  async getReaction(@Param('id') id: string): Promise<any> {
    return await this.reactionsService.getReaction(id);
  }

}
