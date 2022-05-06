import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReaction } from '../../models/reaction.model';
import { IFavorite } from '../../models/favorite.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _favorites: IFavorite[] = [];
  get favorites(): IFavorite[] { return this._favorites }

  private _reactions: IReaction[] = [];

  constructor(private readonly http: HttpClient) {
    this.getFavorites().subscribe(
      (favs: IFavorite[]) => this._favorites.push(...favs),
      (err: any) => console.log(err)
    );
    this.getReactions().subscribe(
      (reacts: IReaction[]) => this._reactions.push(...reacts),
      (err: any) => console.log(err)
    );
  }

  like(id: string, movie: boolean): void {
    const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isLiked(react.media, movie));
    if (foundIdx !== -1) return this.deleteReaction(id);
    this.http.post<IReaction>(
      environment.userDataServiceUrl + 'reactions/like',
      { media: id, movie },
      { withCredentials: true }
    ).subscribe(
      (react: IReaction) => {
        const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isDisliked(react.media, movie));
        if (foundIdx !== -1) this._reactions[foundIdx].like = true;
        else this._reactions.push(react);
      },
      (err: any) => console.log(err)
    )
  }

  dislike(id: string, movie: boolean): void {
    const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isDisliked(react.media, movie));
    if (foundIdx !== -1) return this.deleteReaction(id);
    this.http.post<IReaction>(
      environment.userDataServiceUrl + 'reactions/dislike',
      { media: id, movie },
      { withCredentials: true }
    ).subscribe(
      (react: IReaction) => {
        const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isLiked(react.media, movie));
        if (foundIdx !== -1) this._reactions[foundIdx].like = false;
        else this._reactions.push(react);
      },
      (err: any) => console.log(err)
    )
  }

  private deleteReaction(id: string): void {
    const foundIdx: number = this._reactions.findIndex((react: IReaction) => react.media === id);
    this.http.delete<any>(
      environment.userDataServiceUrl + `reactions/${this._reactions[foundIdx]._id}`,
      { withCredentials: true }
    ).subscribe(
      (res: any) => this._reactions.splice(foundIdx, 1),
      (err: any) => console.log(err)
    );
  }

  isLiked(id: string, isMovie: boolean): boolean {
    return !!this._reactions.find((react: IReaction) => react.media === id && react.like);
  }

  isDisliked(id: string, isMovie: boolean): boolean {
    return !!this._reactions.find((react: IReaction) => react.media === id && !react.like);
  }

  private getReactions(): Observable<IReaction[]> {
    return this.http.get<IReaction[]>(
      environment.userDataServiceUrl + 'reactions',
      { withCredentials: true }
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

  addFavorite(id: string, movie: boolean): void {
    this.http.post<IFavorite>(
      environment.userDataServiceUrl + 'favorites',
      { media: id, movie },
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
