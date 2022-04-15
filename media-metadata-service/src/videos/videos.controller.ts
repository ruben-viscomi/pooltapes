import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './video.model';
import { IsAdminGuard } from '../guards/is-admin.guard';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';


@Controller('videos')
export class VideosController {

  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  createVideo(@Body() video: CreateVideoDto): Promise<Video> {
    return this.videosService.createVideo(video);
  }

  @Get(':id')
  getVideo(@Param('id') id: string): Promise<Video> {
    return this.videosService.getVideo(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  updateVideo(@Param('id') id: string, @Body() updated: UpdateVideoDto): Promise<void> {
    return this.videosService.updateVideo(id, updated);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  deleteVideo(@Param('id') id: string): Promise<void> {
    return this.videosService.deleteVideo(id);
  }

}
