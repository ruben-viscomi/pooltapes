import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User, Admin } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: User | Admin = {} as User;

  constructor(private readonly http: HttpClient) {}

  handshake(): void {
    // TODO: impement in 'auth-service'
    this.http.get(`${environment.authServiceUrl}handshake`, { withCredentials: true }).subscribe(
      (fromToken: any) => this.authenticated = <User | Admin>fromToken
    );
  }

  login(credentials: { mail: string, password: string }): void {
    this.http.post(`${environment.authServiceUrl}users/login`, credentials, { withCredentials: true }).subscribe(
      (user: any) => this.authenticated = <User>user
    );
  }

  adminAccess(credentials: { internNum: string, password: string }): void {
    this.http.post(`${environment.authServiceUrl}admin/access`, credentials, { withCredentials: true }).subscribe(
      (admin: any) => this.authenticated = <Admin>admin
    );
  }

  isAuthenticated(): boolean {
    return !!this.authenticated;
  }

  // NOTE: for isUser(), just use !isAdmin()
  isAdmin(): boolean {
    return (<Admin>this.authenticated).role !== undefined;
  }

  getRole(): number {
    return (<Admin>this.authenticated).role;
  }

}
