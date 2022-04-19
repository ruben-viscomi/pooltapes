import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './video.model';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { AllowRoles } from '../decorators/allow-roles.decorator';
import { Roles } from '../common/roles.enum';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';


@Controller('videos')
@UseGuards(IsAdminGuard)
export class VideosController {

  constructor(private readonly videosService: VideosService) {}

  @Post()
  @AllowRoles(Roles.CONTENT)
  createVideo(@Body() video: CreateVideoDto): Promise<Video> {
    return this.videosService.createVideo(video);
  }

  @Get(':id')
  @UseGuards(IsLoggedGuard)
  getVideo(@Param('id') id: string): Promise<Video> {
    return this.videosService.getVideo(id);
  }

  @Patch(':id')
  @AllowRoles(Roles.CONTENT)
  updateVideo(@Param('id') id: string, @Body() updated: UpdateVideoDto): Promise<void> {
    return this.videosService.updateVideo(id, updated);
  }

  @Delete(':id')
  @AllowRoles(Roles.CONTENT)
  deleteVideo(@Param('id') id: string): Promise<void> {
    return this.videosService.deleteVideo(id);
  }

}
