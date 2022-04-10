import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Video, VideoDocument } from './video.model';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {

  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {}

  async createVideo(video: CreateVideoDto): Promise<Video> {
    return await this.videoModel.create(video);
  }

  async getVideo(id: string): Promise<Video> {
    const foundVideo: Video = await this.videoModel.findById(id);
    if (!foundVideo) throw new NotFoundException();
    return foundVideo;
  }

  async updateVideo(id: string, updated: UpdateVideoDto): Promise<void> {
    await this.videoModel.findByIdAndUpdate(id, updated);
  }

  async deleteVideo(id: string): Promise<void> {
    await this.videoModel.findByIdAndDelete(id);
  }

}
