import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';

import { IFavorite } from '../../../models/favorite.interface';
import { IMedia } from '../../../models/media.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: IFavorite[] = [];

  constructor(private readonly favoritesService: FavoritesService) {
    this.favorites = this.favoritesService.favorites;
  }

  ngOnInit(): void {}

  isEmptyFavorites(): boolean {
    return this.favorites.length === 0;
  }

  getMediaPath(_id: string): string {
    const favorite: IFavorite = <IFavorite>this.favorites.find((fav: IFavorite) => fav.media._id === _id);
    return favorite.media.mediaType === 'Movie' ? 'movies' : 'series';
  }

  onDeleteFav(id: string): void {
    this.favoritesService.deleteFavorite(id);
  }

}
