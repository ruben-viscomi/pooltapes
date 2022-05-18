import { Controller, Get, Post, Body, Param, Query, Delete, UseInterceptors, UseGuards } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { IsUserGuard } from '../guards/is-user.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserId } from '../decorators/user-id.decorator';

import { Favorite } from './favorite.model';

import { FavoriteDto } from './dto/favorite.dto';

@Controller('favorites')
@UseGuards(IsUserGuard)
@UseInterceptors(UserInterceptor)
export class FavoritesController {

  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async createFavorite(@UserId() userId: string, @Body() favorite: FavoriteDto): Promise<Favorite> {
    return await this.favoritesService.createFavorite(userId, favorite);
  }

  @Get()
  async getFavorites(@UserId() userId: string): Promise<any> {
    return await this.favoritesService.getFavorites(userId);
  }

  @Get(':id')
  async getFavorite(@UserId() userId: string, @Param('id') id: string): Promise<Favorite> {
    return await this.favoritesService.getFavorite(userId, id);
  }

  @Delete(':id')
  async deleteFavorite(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.favoritesService.deleteFavorite(userId, id);
  }

}
