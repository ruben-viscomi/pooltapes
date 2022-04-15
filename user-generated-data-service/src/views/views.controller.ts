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
  async incrementView(@UserId() userId: string, @Body() viewDto: ViewDto): Promise<void> {
    return this.viewsService.incrementView(userId, viewDto);
  }

  @Get()
  async findViews(@UserId() userId: string): Promise<any> {
    return this.viewsService.findViews(userId);
  }

  @Get(':id')
  async findView(@UserId() userId: string, @Param('id') id: string): Promise<any> {
    return this.viewsService.findView(userId, id);
  }

}
