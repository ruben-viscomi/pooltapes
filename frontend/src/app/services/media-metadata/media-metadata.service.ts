import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaMetadataService {

  constructor(private readonly http: HttpClient) {}

  getMovieById(id: string): Observable<any> {
    return this.http.get<any>(
      environment.metadataServiceUrl + `movies/${id}`,
      { withCredentials: true }
    );
  }

  getSeriesById(id: string): Observable<any> {
    return this.http.get<any>(
      environment.metadataServiceUrl + `series/${id}`,
      { withCredentials: true }
    );
  }

  getHomeDash(): Observable<any> {
    return this.http.get<any>(
      environment.metadataServiceUrl + 'categories',
      { withCredentials: true }
    );
  }

  getMoviesDash(): Observable<any> {
    return this.http.get<any>(
      environment.metadataServiceUrl + 'categories?movie=true',
      { withCredentials: true }
    );
  }

  getSeriesDash(): Observable<any> {
    return this.http.get<any>(
      environment.metadataServiceUrl + 'categories?movie=false',
      { withCredentials: true }
    );
  }

}
