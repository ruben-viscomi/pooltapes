import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _favorites: any = [];
  get favorites(): readonly any[] { return this._favorites }

  constructor(private readonly http: HttpClient) {
    this.getFavorites().subscribe(
      (favs: any) => this._favorites.push(...favs),
      (err: any) => console.log(err)
    );
  }

  deleteFavorite(id: string): void {
    const fav: any = this._favorites.find((fav: any) => fav.media._id === id);
    this.http.delete<any>(
      environment.userDataServiceUrl + `preferred/${fav._id}`,
      { withCredentials: true }
    ).subscribe(
      (res: any) => {
        const deletedIdx: number = this._favorites.findIndex((fav: any) => fav.media._id === id);
        this._favorites.splice(deletedIdx, 1);
      },
      (err: any) =>  console.log(err)
    );
  }

  addFavorite(id: string, movie: boolean): void {
    this.http.post<any>(
      environment.userDataServiceUrl + 'preferred',
      { media: id, movie },
      { withCredentials: true }
    ).subscribe(
      (fav: any) => this._favorites.push(fav),
      (err: any) => console.log(err)
    );
  }

  getFavorites(): Observable<any> { // TODO: replace type 'any' with proper Data Model
    return this.http.get<any>(
      environment.userDataServiceUrl + 'preferred',
      { withCredentials: true }
    );
  }

  getFavorite(id: string): any | null {
    return this.favorites.find((fav: any) => fav.media._id === id);
  }

}
