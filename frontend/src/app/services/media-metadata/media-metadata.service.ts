import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { IMovie } from '../../models/movie.interface';
import { ISeries } from '../../models/series.interface';
import { ICategory } from '../../models/category.interface';
import { IVideo } from '../../models/video.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaMetadataService {

  constructor(private readonly http: HttpClient) {}

  getPinned(section: string): Observable<ISeries[] | IMovie[]> {
    return this.http.get<any>(
      environment.metadataServiceUrl + `pinned/${section}`,
      { withCredentials: true }
    );
  }

  getMovieById(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(
      environment.metadataServiceUrl + `movies/${id}`,
      { withCredentials: true }
    );
  }

  getSeriesById(id: string): Observable<ISeries> {
    return this.http.get<ISeries>(
      environment.metadataServiceUrl + `series/${id}`,
      { withCredentials: true }
    );
  }

  getHomeDash(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      environment.metadataServiceUrl + 'categories?dash=0',
      { withCredentials: true }
    );
  }

  getMoviesDash(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      environment.metadataServiceUrl + 'categories?movie=true&dash=1',
      { withCredentials: true }
    );
  }

  getSeriesDash(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      environment.metadataServiceUrl + 'categories?movie=false&dash=1',
      { withCredentials: true }
    );
  }

  requestVideoById(id: string): Observable<IVideo> {
    return this.http.get<IVideo>(
      environment.videosUrl + `/${id}`,
      environment.httpOptions
    );
  }

}
