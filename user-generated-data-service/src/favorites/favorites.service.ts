import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';

import { FavoriteRepository } from './favorite.repository';
import { Favorite, FavoriteDocument } from './favorite.model';

import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoritesService {

  private get favoriteModel(): Model<FavoriteDocument> { return this.favoriteRepo.model }

  constructor(private readonly favoriteRepo: FavoriteRepository) {}

  async createFavorite(userId: string, favorite: FavoriteDto): Promise<Favorite> {
    const foundFavorite: Favorite = await this.favoriteModel.findOne({ ...favorite, userId });
    if (foundFavorite) throw new ConflictException('favorite already existing');
    const { _id } = await this.favoriteModel.create({ ...favorite, userId });
    return await this.getFavorite(userId, _id);
  }

  async getFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepo.getPopulatedAll({ userId });
  }

  async getFavorite(userId: string, id: string): Promise<Favorite> {
    const favorite: Favorite = await this.favoriteRepo.getPopulatedById({ _id: id, userId });
    if (!favorite) throw new NotFoundException('the requested favorite doesn\'t exists');
    return favorite;
  }

  async deleteFavorite(userId: string, id: string): Promise<void> {
    const favorite: Favorite = await this.favoriteModel.findOneAndDelete({ _id: id, userId });
    if (!favorite) throw new NotFoundException('the requested favorite doesn\'t exists');
  }

}
