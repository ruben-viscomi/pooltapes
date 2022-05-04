import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data/user-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: any = []; // TODO: replace with proper Data Model

  constructor(private readonly userData: UserDataService) {
    this.favorites = this.userData.favorites;
  }

  ngOnInit(): void {
  }

  isEmptyFavorites(): boolean {
    return this.favorites.length === 0;
  }

  getMediaPath(_id: string): string {
    const media = this.favorites.find((fav: any) => fav.media._id === _id)
    return media.movie ? 'movies' : 'series';
  }

  onDeleteFav(id: string): void {
    this.userData.deleteFavorite(id);
  }

}
