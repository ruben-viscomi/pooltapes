import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './video.model';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';


@Controller('videos')
export class VideosController {

  constructor(private videosService: VideosService) {}

  @Post()
  createVideo(@Body() video: CreateVideoDto): Promise<Video> {
    return this.videosService.createVideo(video);
  }

  @Get(':id')
  getVideo(@Param('id') id: string): Promise<Video> {
    return this.videosService.getVideo(id);
  }

  @Patch(':id')
  updateVideo(@Param('id') id: string, @Body() updated: UpdateVideoDto): Promise<void> {
    return this.videosService.updateVideo(id, updated);
  }

  @Delete(':id')
  deleteVideo(@Param('id') id: string): Promise<void> {
    return this.videosService.deleteVideo(id);
  }

}
