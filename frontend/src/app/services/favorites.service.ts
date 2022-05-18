import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFavorite } from '../models/favorite.interface';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private _favorites: IFavorite[] = [];
  get favorites(): IFavorite[] { return this._favorites }

  constructor(private readonly http: HttpClient) {
    this.requestFavorites().subscribe(
      (favs: IFavorite[]) => this._favorites.push(...favs),
      () => {}
    );
  }

  deleteFavorite(id: string): void {
    const found: IFavorite = <IFavorite>this._favorites.find((fav: IFavorite) => fav.media._id === id);
    this.requestDeleteFromFavorites(found._id).subscribe(
      () => {
        const deletedIdx: number = this._favorites.findIndex((fav: IFavorite) => fav.media._id === id);
        this._favorites.splice(deletedIdx, 1);
      },
      () => {}
    );
  }

  addFavorite(id: string): void {
    this.requestAddToFavorites(id).subscribe(
      (fav: IFavorite) => this._favorites.unshift(fav),
      () => {}
    );
  }

  getFavorite(id: string): IFavorite | undefined {
    return this.favorites.find((fav: IFavorite) => fav.media._id === id);
  }

  // ↓ HTTP Request Methods ↓ //

  private requestDeleteFromFavorites(favoriteId: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.favoritesUrl}/${favoriteId}`,
      environment.httpOptions
    );
  }

  private requestAddToFavorites(media: string): Observable<IFavorite> {
    return this.http.post<IFavorite>(
      environment.favoritesUrl,
      { media },
      environment.httpOptions
    );
  }

  private requestFavorites(): Observable<IFavorite[]> {
    return this.http.get<IFavorite[]>(
      environment.favoritesUrl,
      environment.httpOptions
    );
  }

}
