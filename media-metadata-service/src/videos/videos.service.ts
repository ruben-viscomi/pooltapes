import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';

import { VideoRepository } from './video.repository';
import { Video, VideoDocument } from './video.model';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

import { HOSTS } from '../data/hosts';
import axios from 'axios';

@Injectable()
export class VideosService {

  constructor(private readonly videoRepo: VideoRepository) {}

  async createVideo(video: CreateVideoDto): Promise<Video> {
    const host = await this.getFreeHost();
    if (!host) throw new InternalServerErrorException('all VOD servers are busy or full');
    Object.assign(video, { host });
    return await this.videoRepo.create(video);
  }

  async getVideo(id: string): Promise<Video> {
    const foundVideo: Video = await this.videoRepo.findById(id);
    if (!foundVideo) throw new NotFoundException();
    return foundVideo;
  }

  async updateVideo(id: string, updated: UpdateVideoDto): Promise<void> {
    await this.videoRepo.findByIdAndUpdate(id, updated);
  }

  async deleteVideo(id: string): Promise<void> {
    await this.videoRepo.findByIdAndDelete(id);
  }

  async checkVideos(videoIds: string[]): Promise<boolean> {
    const found = await this.videoRepo.find({ _id: { $in: videoIds } });
    return found.length === videoIds.length;
  }

  async getFreeHost(): Promise<string> {
    for (let host of HOSTS) {
      if (await this.canHost(host))
        return host;
    }
    return '';
  }

  async canHost(host: string): Promise<boolean> {
    try {
      var isFreeHost: boolean = !! await axios.get<boolean>('http://' + host + '/can-host');
    }
    catch (error) {
      isFreeHost = false;
    }
    return isFreeHost;
  }

}
