import { Injectable, NotFoundException } from '@nestjs/common';

import { ViewRepository } from './view.repository';
import { View, ViewDocument } from './view.model';
import { MediaService } from '../media/media.service';
import { VideoRepository } from '../videos/video.repository';

import { ViewDto } from './dto/view.dto';

@Injectable()
export class ViewsService {

  constructor(
    private readonly viewRepo: ViewRepository,
    private readonly videoRepo: VideoRepository,
    private readonly mediaService: MediaService
  ) {}

  async incrementViews(userId: string, viewDto: ViewDto): Promise<View> {
    const lastWatched: number = Date.now();
    Object.assign(viewDto, { lastWatched });

    const { mediaId, video, watchTimeMarker } = viewDto;
    const completed: boolean = watchTimeMarker >= (await this.videoRepo.findById(video)).endMarker;

    const view: ViewDocument = await this.viewRepo.findOne({ mediaId, video, userId });
    if (view) {
      if (completed) {
        view.count += 1;
        await this.mediaService.incrementViews(mediaId);
      }
      view.lastWatched = lastWatched;
      view.watchTimeMarker = watchTimeMarker;
      return await view.save();
    }

    if (completed)
      await this.mediaService.incrementViews(mediaId);
    var count: number = completed ? 1 : 0;
    return await this.viewRepo.create({ ...viewDto, userId, count });
  }

  async getViews(userId: string): Promise<View[]> {
    return await this.viewRepo.find({ userId });
  }

  async getView(userId: string, id: string): Promise<View> {
    const view: View = await this.viewRepo.findOne({ _id: id, userId });
    if (!view) throw new NotFoundException();
    return view;
  }

  async getLatestMediaView(userId: string, mediaId: string): Promise<View> {
    const latest: View = await this.viewRepo.max({ mediaId }, 'lastWatched');
    if (!latest) throw new NotFoundException();
    return latest;
  }

  async getVideoView(userId: string, video: string): Promise<View> {
    const found: View = await this.viewRepo.findOne({ video });
    if (!found) throw new NotFoundException();
    return found;
  }

}
