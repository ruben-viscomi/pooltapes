import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFavorite } from '../models/favorite.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private _favorites: IFavorite[] = [];
  get favorites(): IFavorite[] { return this._favorites }

  constructor(private readonly http: HttpClient) {
    this.getFavorites().subscribe(
      (favs: IFavorite[]) => this._favorites.push(...favs),
      (err: any) => console.log(err)
    );
  }

  deleteFavorite(id: string): void {
    const fav: IFavorite = <IFavorite>this._favorites.find((fav: IFavorite) => fav.media._id === id);
    this.http.delete<any>(
      environment.userDataServiceUrl + `favorites/${fav._id}`,
      { withCredentials: true }
    ).subscribe(
      (res: any) => {
        const deletedIdx: number = this._favorites.findIndex((fav: IFavorite) => fav.media._id === id);
        this._favorites.splice(deletedIdx, 1);
      },
      (err: any) =>  console.log(err)
    );
  }

  addFavorite(id: string): void {
    this.http.post<IFavorite>(
      environment.userDataServiceUrl + 'favorites',
      { media: id },
      { withCredentials: true }
    ).subscribe(
      (fav: IFavorite) => this._favorites.push(fav),
      (err: any) => console.log(err)
    );
  }

  private getFavorites(): Observable<IFavorite[]> {
    return this.http.get<IFavorite[]>(
      environment.userDataServiceUrl + 'favorites',
      { withCredentials: true }
    );
  }

  getFavorite(id: string): IFavorite | undefined {
    return this.favorites.find((fav: IFavorite) => fav.media._id === id);
  }

}
