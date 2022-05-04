import { Controller, Get, Post, Body, Param, Query, Delete, UseInterceptors, UseGuards } from '@nestjs/common';

import { PreferredService } from './preferred.service';
import { IsUserGuard } from '../guards/is-user.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserId } from '../decorators/user-id.decorator';

import { PreferredDto } from './dto/preferred.dto';

@Controller('preferred')
@UseGuards(IsUserGuard)
@UseInterceptors(UserInterceptor)
export class PreferredController {

  constructor(private readonly preferredService: PreferredService) {}

  @Post()
  async createPreferred(@UserId() userId: string, @Body() preferred: PreferredDto): Promise<void> {
    await this.preferredService.createPreferred(userId, preferred);
  }

  @Get()
  async getAllPreferred(@UserId() userId: string): Promise<any> {
    return await this.preferredService.getAllPreferred(userId);
  }

  @Get(':id')
  async getPreferred(@UserId() userId: string, @Param('id') id: string): Promise<any> {
    return await this.preferredService.getPreferred(userId, id);
  }

  @Delete(':id')
  async deletePreferred(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.preferredService.deletePreferred(userId, id);
  }

}
