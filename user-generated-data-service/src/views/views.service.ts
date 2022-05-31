import { Injectable, NotFoundException } from '@nestjs/common';

import { ViewRepository } from './view.repository';
import { View, ViewDocument } from './view.model';
import { MediaService } from '../media/media.service';

import { ViewDto } from './dto/view.dto';

@Injectable()
export class ViewsService {

  constructor(
    private readonly viewRepo: ViewRepository,
    private readonly mediaService: MediaService
  ) {}

  async incrementViews(userId: string, viewDto: ViewDto): Promise<View> {
    const lastWatched: number = Date.now();
    Object.assign(viewDto, { lastWatched });

    const { mediaId, video, completed, watchTimeMarker } = viewDto;
    delete viewDto.completed;

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

    var count: number = completed ? 1 : 0;
    return await this.viewRepo.create({ ...viewDto, userId, count });
    if (completed)
      await this.mediaService.incrementViews(mediaId);
  }

  async getViews(userId: string): Promise<View[]> {
    return await this.viewRepo.find({ userId });
  }

  async getView(userId: string, id: string): Promise<View> {
    const view: View = await this.viewRepo.findOne({ _id: id, userId });
    if (!view) throw new NotFoundException();
    return view;
  }

}
