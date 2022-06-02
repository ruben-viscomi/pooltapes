import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IView } from '../models/view.interface';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  private _views: IView[] = [];

  constructor(private readonly http: HttpClient) {
    this.requestViews().subscribe(
      (views: IView[]) => this._views.push(...views),
      (err: HttpErrorResponse) => console.log(err)
    );
  }

  getLatest(mediaId: string): IView {
    const filtered: IView[] = this._views.filter((view: IView) => view.mediaId === mediaId);
    if (!filtered.length) return {} as IView;
    return filtered.reduce((prev: IView, next: IView) => (prev.lastWatched < next.lastWatched) ? next : prev);
  }

  // ↓ HTTP Request Methods ↓ //

  private requestViews(): Observable<IView[]> {
    return this.http.get<IView[]>(environment.viewsUrl, environment.httpOptions);
  }

  endView(mediaId: string, video: string, watchTimeMarker: number): Observable<IView> {
    return this.http.post<IView>(
      environment.viewsUrl,
      { mediaId, video, watchTimeMarker },
      environment.httpOptions
    )
  }

  requestLatest(mediaId: string): Observable<IView> {
    return this.http.get<IView>(
      environment.viewsUrl + `/media/${mediaId}/latest`,
      environment.httpOptions
    )
  }

  requestViewByVideo(videoId: string): Observable<IView> {
    return this.http.get<IView>(
      environment.viewsUrl + `/video/${videoId}`,
      environment.httpOptions
    )
  }

}
