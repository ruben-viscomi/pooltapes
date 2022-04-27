import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User, Admin, Roles } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: User | Admin = {} as User;

  private _isAuthenticated: boolean = false;

  authenticationCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  isAuthUser: EventEmitter<boolean> = new EventEmitter<boolean>();
  isAuthAdmin: EventEmitter<Roles> = new EventEmitter<Roles>();

  constructor(private readonly http: HttpClient) {
    this.handshake();
    this.authenticationCompleted.subscribe(
      (completed: boolean) => {
        this._isAuthenticated = completed;
        if (this.isUser()) {
          this.isAuthUser.emit(true);
          this.isAuthAdmin.emit(undefined);
        }
        else if (this.isAdmin()) {
          this.isAuthAdmin.emit((<Admin>this.authenticated).role);
          this.isAuthUser.emit(false);
        }
      }
    );
  }

  handshake(): void {
    this.http.get(`${environment.authServiceUrl}handshake`, { withCredentials: true }).subscribe(
      (fromToken: any) => {
        this.authenticated = <User | Admin>fromToken;
        this.authenticationCompleted.emit(true);
      },
      (error: HttpErrorResponse) => this.clearAuth()
    );
  }

  login(credentials: { mail: string, password: string }): void {
    this.http.post(`${environment.authServiceUrl}users/login`, credentials, { withCredentials: true }).subscribe(
      (user: any) => this.authUser(user),
      (error: HttpErrorResponse) => this.clearAuth()
    );
  }

  logout(): void {
    this.http.post(`${environment.authServiceUrl}users/logout`, null, { withCredentials: true }).subscribe();
  }

  adminAccess(credentials: { internNum: string, password: string }): void {
    this.http.post(`${environment.authServiceUrl}admin/access`, credentials, { withCredentials: true }).subscribe(
      (admin: any) => this.authAdmin(admin),
      (error: HttpErrorResponse) => this.clearAuth()
    );
  }

  adminLogout(): void {
    this.http.post(`${environment.authServiceUrl}admin/logout`, null, { withCredentials: true }).subscribe();
  }

  private clearAuth(): void {
    this.authenticated = {} as User;
    this.authenticationCompleted.emit(false);
    this.isAuthAdmin.emit(undefined);
    this.isAuthUser.emit(false);
  }

  private authAdmin(admin: Admin): void {
    this.authenticated = <Admin>admin;
    this.isAuthAdmin.emit(this.authenticated.role);
    this.authenticationCompleted.emit(true);
  }

  private authUser(user: User): void {
    this.authenticated = <User>user;
    this.isAuthUser.emit(true);
    this.authenticationCompleted.emit(true);
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  isAdmin(): boolean {
    return (<Admin>this.authenticated).role !== undefined && this.isAuthenticated;
  }

  isUser(): boolean {
    return !this.isAdmin() && this.isAuthenticated;
  }

  get role(): number {
    return (<Admin>this.authenticated).role;
  }

}
