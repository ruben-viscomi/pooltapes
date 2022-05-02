import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private readonly http: HttpClient) {}

  getFavoriteMovies(): Observable<any> { // TODO: replace type 'any' with proper Data Model
    return this.http.get<any>(
      environment.userDataServiceUrl + 'preferred',
      { withCredentials: true }
    );
  }

}
