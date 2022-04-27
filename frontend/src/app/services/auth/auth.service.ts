import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User, Admin, Roles } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: User | Admin = {} as User;

  private handshakeComplete: boolean = false;

  handshakeCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  isHandshakedUser: EventEmitter<boolean> = new EventEmitter<boolean>();
  isHandshakedAdmin: EventEmitter<Roles> = new EventEmitter<Roles>();

  constructor(private readonly http: HttpClient) {
    this.handshake();
    this.handshakeCompleted.subscribe(
      (completed: boolean) => {
        this.handshakeComplete = completed;
        if (this.isUser()) {
          this.isHandshakedUser.emit(true);
          this.isHandshakedAdmin.emit(undefined);
        }
        else if (this.isAdmin()) {
          this.isHandshakedAdmin.emit((<Admin>this.authenticated).role);
          this.isHandshakedUser.emit(false);
        }
      }
    );
  }

  handshake(): void {
    this.http.get(`${environment.authServiceUrl}handshake`, { withCredentials: true }).subscribe(
      (fromToken: any) => {
        this.authenticated = <User | Admin>fromToken;
        console.log('user from handshake()', this.authenticated); // TODO: remove if debugged
        this.handshakeCompleted.emit(true);
      }
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
    return !!this.authenticated._id;
  }

  // NOTE: for isUser(), just use !isAdmin()
  isAdmin(): boolean {
    return (<Admin>this.authenticated).role !== undefined && this.isAuthenticated();
  }

  isUser(): boolean {
    return !this.isAdmin() && this.isAuthenticated();
  }

  getRole(): number {
    return (<Admin>this.authenticated).role;
  }

  isHandshakeComplete(): boolean {
    return this.handshakeComplete;
  }

}
