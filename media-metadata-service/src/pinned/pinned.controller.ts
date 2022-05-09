import { Controller, Patch, Get, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';

import { PinnedService } from './pinned.service';

@Controller('pinned')
export class PinnedController {

  constructor(private readonly pinnedService: PinnedService) {
    this.pinnedService.createPinSection('home');
    this.pinnedService.createPinSection('movies');
    this.pinnedService.createPinSection('series');
  }

  @Patch(':section')
  pinTo(@Param('section') section: string, @Body() media: string[]): void {
    this.pinnedService.pinTo(section, media);
  }

}
