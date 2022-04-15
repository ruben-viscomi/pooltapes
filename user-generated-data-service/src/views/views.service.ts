import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { View, ViewDocument } from './view.model';
import { MoviesService } from '../movies/movies.service';
import { SeriesService } from '../series/series.service';

import { ViewDto } from './dto/view.dto';

@Injectable()
export class ViewsService {

  constructor(
    @InjectModel(View.name) private readonly viewModel: Model<ViewDocument>,
    private readonly moviesService: MoviesService,
    private readonly seriesService: SeriesService
  ) {}

  async incrementViews(userId: string, viewDto: ViewDto): Promise<void> {
    const view: ViewDocument = await this.viewModel.findOne({ ...viewDto, userId });

    const { movie, mediaId } = viewDto;

    if (view) {
      view.count += 1;
      if (movie) await this.moviesService.incrementViews(mediaId);
      else await this.seriesService.incrementViews(mediaId);
      await view.save();
      return;
    }

    await this.viewModel.create({ ...viewDto, userId, count: 1 });
    if (movie) await this.moviesService.incrementViews(mediaId);
    else await this.seriesService.incrementViews(mediaId);
  }

  async getViews(userId: string): Promise<View[]> {
    return await this.viewModel.find({ userId });
  }

  async getView(userId: string, id: string): Promise<View> {
    const view: View = await this.viewModel.findOne({ _id: id, userId });
    if (!view) throw new NotFoundException();
    return view;
  }

}
