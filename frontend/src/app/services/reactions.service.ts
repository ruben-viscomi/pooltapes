import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReaction } from '../models/reaction.interface';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {

  private _reactions: IReaction[] = [];

  constructor(private readonly http: HttpClient) {
    this.getReactions().subscribe(
      (reacts: IReaction[]) => this._reactions.push(...reacts),
      (err: HttpErrorResponse) => console.log(err)
    );
  }

  like(id: string): void {
    const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isLiked(react.media) && react.media === id);

    if (foundIdx !== -1) return this.deleteReaction(id);
    this.http.post<IReaction>(
      environment.userDataServiceUrl + 'reactions/like',
      { media: id },
      { withCredentials: true }
    ).subscribe(
      (react: IReaction) => {
        const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isDisliked(react.media) && react.media === id);
        if (foundIdx !== -1) this._reactions[foundIdx].like = true;
        else this._reactions.push(react);
      },
      (err: HttpErrorResponse) => console.log(err)
    )
  }

  dislike(id: string): void {
    const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isDisliked(react.media) && react.media === id);
    if (foundIdx !== -1) return this.deleteReaction(id);
    this.http.post<IReaction>(
      environment.userDataServiceUrl + 'reactions/dislike',
      { media: id },
      { withCredentials: true }
    ).subscribe(
      (react: IReaction) => {
        const foundIdx: number = this._reactions.findIndex((react: IReaction) => this.isLiked(react.media) && react.media === id);
        if (foundIdx !== -1) this._reactions[foundIdx].like = false;
        else this._reactions.push(react);
      },
      (err: HttpErrorResponse) => console.log(err)
    )
  }

  private deleteReaction(id: string): void {
    const foundIdx: number = this._reactions.findIndex((react: IReaction) => react.media === id);
    this.http.delete<any>(
      environment.userDataServiceUrl + `reactions/${this._reactions[foundIdx]._id}`,
      { withCredentials: true }
    ).subscribe(
      (res: any) => this._reactions.splice(foundIdx, 1),
      (err: HttpErrorResponse) => console.log(err)
    );
  }

  isLiked(id: string): boolean {
    return !!this._reactions.find((react: IReaction) => react.media === id && react.like);
  }

  isDisliked(id: string): boolean {
    return !!this._reactions.find((react: IReaction) => react.media === id && !react.like);
  }

  private getReactions(): Observable<IReaction[]> {
    return this.http.get<IReaction[]>(
      environment.userDataServiceUrl + 'reactions',
      { withCredentials: true }
    );
  }


}
