import { Controller, Get, Post, Body, Param, UseInterceptors, UseGuards } from '@nestjs/common';

import { ViewsService } from './views.service';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { IsUserGuard } from '../guards/is-user.guard';
import { UserId } from '../decorators/user-id.decorator';
import { View } from './view.model';

import { ViewDto } from './dto/view.dto';

@Controller('views')
@UseGuards(IsUserGuard)
@UseInterceptors(UserInterceptor)
export class ViewsController {

  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  async incrementView(@UserId() userId: string, @Body() viewDto: ViewDto): Promise<View> {
    return await this.viewsService.incrementViews(userId, viewDto);
  }

  @Get()
  async getViews(@UserId() userId: string): Promise<View[]> {
    return await this.viewsService.getViews(userId);
  }

  @Get(':id')
  async getView(@UserId() userId: string, @Param('id') id: string): Promise<View> {
    return await this.viewsService.getView(userId, id);
  }

  @Get('media/:mediaId/latest')
  async getLatestMediaView(@UserId() userId: string, @Param('mediaId') mediaId: string): Promise<View> {
    return await this.viewsService.getLatestMediaView(userId, mediaId);
  }

  @Get('video/:videoId')
  async getVideoView(@UserId() userId: string, @Param('videoId') videoId: string): Promise<View> {
    return await this.viewsService.getVideoView(userId, videoId);
  }

}
