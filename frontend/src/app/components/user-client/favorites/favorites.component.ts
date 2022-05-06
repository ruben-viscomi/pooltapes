import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data/user-data.service';

import { IFavorite } from '../../../models/favorite.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: IFavorite[] = [];

  constructor(private readonly userData: UserDataService) {
    this.favorites = this.userData.favorites;
  }

  ngOnInit(): void {}

  isEmptyFavorites(): boolean {
    return this.favorites.length === 0;
  }

  getMediaPath(_id: string): string {
    const favorite: IFavorite = <IFavorite>this.favorites.find((fav: IFavorite) => fav.media._id === _id);
    return favorite.movie ? 'movies' : 'series';
  }

  onDeleteFav(id: string): void {
    this.userData.deleteFavorite(id);
  }

}
