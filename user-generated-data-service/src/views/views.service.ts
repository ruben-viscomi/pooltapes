import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { View, ViewDocument } from './view.model';

import { ViewDto } from './dto/view.dto';

@Injectable()
export class ViewsService {

  constructor(@InjectModel(View.name) private readonly viewModel: Model<ViewDocument>) {}

  async incrementView(viewDto: ViewDto): Promise<void> {
    // TODO: implement
  }

  async findViews(): Promise<any> {
    // TODO: implement.
    return `This action returns all views`;
  }

  async findView(id: number): Promise<any> {
    // TODO: implement.
    return `This action returns a #${id} view`;
  }

}
