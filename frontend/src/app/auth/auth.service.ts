import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {}

  login(credentials: { mail: string, password: string }): void {
    this.http.post(`${environment.authServiceUrl}users/login`, credentials, { withCredentials: true }).subscribe(
      (user: any) => {
        // TODO: handle response.
        console.log(user);        
      }
    );
  }

  adminAccess(credentials: { internNum: string, password: string }): void {
    this.http.post(`${environment.authServiceUrl}admin/access`, credentials, { withCredentials: true }).subscribe(
      (admin: any) => {
        // TODO: handle response.
        console.log(admin);
      }
    );
  }

}
