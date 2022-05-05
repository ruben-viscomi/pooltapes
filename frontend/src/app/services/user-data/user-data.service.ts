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

  private _reactions: any = [];

  constructor(private readonly http: HttpClient) {
    this.getFavorites().subscribe(
      (favs: any) => this._favorites.push(...favs),
      (err: any) => console.log(err)
    );
    this.getReactions().subscribe(
      (reacts: any) => this._reactions.push(...reacts),
      (err: any) => console.log(err)
    );
  }

  like(id: string, movie: boolean): void {
    const foundIdx: number = this._reactions.findIndex((react: any) => this.isLiked(react.media, movie));
    if (foundIdx !== -1) return this.deleteReaction(id);
    this.http.post<any>(
      environment.userDataServiceUrl + 'reactions/like',
      { media: id, movie },
      { withCredentials: true }
    ).subscribe(
      (react: any) => {
        const foundIdx: number = this._reactions.findIndex((react: any) => this.isDisliked(react.media, movie));
        if (foundIdx !== -1) this._reactions[foundIdx].like = true;
        else this._reactions.push(react);
      },
      (err: any) => console.log(err)
    )
  }

  dislike(id: string, movie: boolean): void {
    const foundIdx: number = this._reactions.findIndex((react: any) => this.isDisliked(react.media, movie));
    if (foundIdx !== -1) return this.deleteReaction(id);
    this.http.post<any>(
      environment.userDataServiceUrl + 'reactions/dislike',
      { media: id, movie },
      { withCredentials: true }
    ).subscribe(
      (react: any) => {
        const foundIdx: number = this._reactions.findIndex((react: any) => this.isLiked(react.media, movie));
        if (foundIdx !== -1) this._reactions[foundIdx].like = false;
        else this._reactions.push(react);
      },
      (err: any) => console.log(err)
    )
  }

  private deleteReaction(id: string): void {
    const foundIdx: number = this._reactions.findIndex((react: any) => react.media === id);
    this.http.delete<any>(
      environment.userDataServiceUrl + `reactions/${this._reactions[foundIdx]._id}`,
      { withCredentials: true }
    ).subscribe(
      (res: any) => this._reactions.splice(foundIdx, 1),
      (err: any) => console.log(err)
    );
  }

  isLiked(id: string, isMovie: boolean): boolean {
    return !!this._reactions.find((react: any) => react.media === id && react.like);
  }

  isDisliked(id: string, isMovie: boolean): boolean {
    return !!this._reactions.find((react: any) => react.media === id && !react.like);
  }

  private getReactions(): Observable<any> {
    return this.http.get<any>(
      environment.userDataServiceUrl + 'reactions',
      { withCredentials: true }
    );
  }

  deleteFavorite(id: string): void {
    const fav: any = this._favorites.find((fav: any) => fav.media._id === id);
    this.http.delete<any>(
      environment.userDataServiceUrl + `favorites/${fav._id}`,
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
      environment.userDataServiceUrl + 'favorites',
      { media: id, movie },
      { withCredentials: true }
    ).subscribe(
      (fav: any) => this._favorites.push(fav),
      (err: any) => console.log(err)
    );
  }

  private getFavorites(): Observable<any> { // TODO: replace type 'any' with proper Data Model
    return this.http.get<any>(
      environment.userDataServiceUrl + 'favorites',
      { withCredentials: true }
    );
  }

  getFavorite(id: string): any | null {
    return this.favorites.find((fav: any) => fav.media._id === id);
  }

}
