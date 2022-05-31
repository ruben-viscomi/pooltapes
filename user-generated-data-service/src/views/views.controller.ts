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
    return this.viewsService.incrementViews(userId, viewDto);
  }

  @Get()
  async getViews(@UserId() userId: string): Promise<View[]> {
    return this.viewsService.getViews(userId);
  }

  @Get(':id')
  async getView(@UserId() userId: string, @Param('id') id: string): Promise<View> {
    return this.viewsService.getView(userId, id);
  }

}
