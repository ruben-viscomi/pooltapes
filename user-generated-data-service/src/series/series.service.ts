import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Series, SeriesDocument } from './series.model';

@Injectable()
export class SeriesService {

  constructor(@InjectModel(Series.name) private seriesModel: Model<SeriesDocument>) {}

  async like(id: string, isChange: boolean = false): Promise<void> {
    const series: SeriesDocument = await this.seriesModel.findById(id);
    if (!series) throw new BadRequestException('series doesn\'t exists');
    series.likes += 1;
    if (isChange) series.dislikes -= 1;
    await series.save();
  }

  async dislike(id: string, isChange: boolean = false): Promise<void> {
    const series: SeriesDocument = await this.seriesModel.findById(id);
    if (!series) throw new BadRequestException('series doesn\'t exists');
    series.dislikes += 1;
    if (isChange) series.likes -= 1;
    await series.save();
  }

  async removeReaction(id: string, isLike: boolean): Promise<void> {
    const series: SeriesDocument = await this.seriesModel.findById(id);
    if (!series) throw new BadRequestException('series doesn\'t exists');
    if (isLike) series.likes -= 1;
    else series.dislikes -= 1;
    await series.save();
  }

}
