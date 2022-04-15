import { Injectable } from '@nestjs/common';
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

  async incrementView(userId: string, viewDto: ViewDto): Promise<void> {
    // TODO: implement
  }

  async findViews(userId: string): Promise<any> {
    // TODO: implement.
    return `This action returns all views`;
  }

  async findView(userId: string, id: string): Promise<any> {
    // TODO: implement.
    return `This action returns a #${id} view`;
  }

}
