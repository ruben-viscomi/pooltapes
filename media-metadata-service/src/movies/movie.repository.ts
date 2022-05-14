import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Media, MediaDocument } from '../media/media.model';
import { Movie, MovieDocument, MovieSchema } from './movie.model';

export class MovieRepository {

  public model: Model<MovieDocument>
  constructor(@InjectModel(Media.name) mediaModel: Model<MediaDocument>) {
    this.model = mediaModel.discriminator(Movie.name, MovieSchema);
  }

  async getPopulatedAll(query: any): Promise<Movie[]> {
    const { from, limit } = this.getLimitsFromQuery(query);
    return await this.model.find(query).populate('video').skip(from).limit(limit);
  }

  async getPopulatedById(id: string): Promise<Movie> {
    return await this.model.findById(id).populate('video');
  }

  private getLimitsFromQuery(query: any): { from: number, limit: number } {
    const { from, limit } = query;
    delete query.from; delete query.limit;
    return { from, limit };
  }

}
