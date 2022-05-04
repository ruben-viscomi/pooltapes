import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';

import { FavoriteRepository } from './favorite.repository';
import { Preferred, PreferredDocument } from './preferred.model';

import { PreferredDto } from './dto/preferred.dto';

@Injectable()
export class PreferredService {

  private get preferredModel(): Model<PreferredDocument> { return this.favoriteRepo.model }

  constructor(private readonly favoriteRepo: FavoriteRepository) {}

  async createPreferred(userId: string, preferred: PreferredDto): Promise<Preferred> {
    const foundPreferred: Preferred = await this.preferredModel.findOne({ ...preferred, userId });
    if (foundPreferred) throw new ConflictException('preferred already existing');
    const { _id } = await this.preferredModel.create({ ...preferred, userId });
    return await this.getPreferred(userId, _id);
  }

  async getAllPreferred(userId: string): Promise<Preferred[]> {
    return this.favoriteRepo.getPopulatedAll({ userId });
  }

  async getPreferred(userId: string, id: string): Promise<Preferred> {
    const preferred: Preferred = await this.favoriteRepo.getPopulatedById({ _id: id, userId });
    if (!preferred) throw new NotFoundException('the requested preferred doesn\'t exists');
    return preferred;
  }

  async deletePreferred(userId: string, id: string): Promise<void> {
    const preferred: Preferred = await this.preferredModel.findOneAndDelete({ _id: id, userId });
    if (!preferred) throw new NotFoundException('the requested preferred doesn\'t exists');
  }

}
