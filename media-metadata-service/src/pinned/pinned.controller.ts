import { Controller, Post, Get, Patch, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';

import { PinnedService } from './pinned.service';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { Pinned } from './pinned.model';
import { Movie } from '../movies/movie.model';
import { Series } from '../series/series.model';

import { UpdatePinsDto } from './dto/update-pins.dto';

@Controller('pinned')
export class PinnedController {

  constructor(private readonly pinnedService: PinnedService) {}

  @Post(':section')
  @UseGuards(IsAdminGuard)
  async createPinSection(@Param('section') section: string): Promise<Pinned> {
    return await this.pinnedService.createPinSection(section);
  }

  @Patch(':section')
  @UseGuards(IsAdminGuard)
  async pinTo(@Param('section') section: string, @Body() updatePins: UpdatePinsDto): Promise<void> {
    await this.pinnedService.pinTo(section, updatePins);
  }

  @Get(':section')
  @UseGuards(IsLoggedGuard)
  async getPins(@Param('section') section: string): Promise<Movie[] | Series[]> {
    return await this.pinnedService.getPins(section);
  }

}
