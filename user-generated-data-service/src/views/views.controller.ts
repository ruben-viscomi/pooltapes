import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ViewsService } from './views.service';

import { ViewDto } from './dto/view.dto';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  async incrementView(@Body() viewDto: ViewDto): Promise<void> {
    return this.viewsService.incrementView(viewDto);
  }

  @Get()
  async findViews(): Promise<any> {
    return this.viewsService.findViews();
  }

  @Get(':id')
  async findView(@Param('id') id: string): Promise<any> {
    return this.viewsService.findView(+id);
  }

}
