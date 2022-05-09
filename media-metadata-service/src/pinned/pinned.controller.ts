import { Controller, Patch, Get, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';

import { PinnedService } from './pinned.service';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { Pinned } from './pinned.model';

import { UpdatePinsDto } from './dto/update-pins.dto';

@Controller('pinned')
export class PinnedController {

  constructor(private readonly pinnedService: PinnedService) {}

  @Patch(':section')
  @UseGuards(IsAdminGuard)
  async pinTo(@Param('section') section: string, @Body() updatePins: UpdatePinsDto): Promise<void> {
    await this.pinnedService.pinTo(section, updatePins);
  }

  @Get(':section')
  @UseGuards(IsLoggedGuard)
  async getPins(@Param('section') section: string): Promise<Pinned> {
    return await this.pinnedService.getPins(section);
  }

}
