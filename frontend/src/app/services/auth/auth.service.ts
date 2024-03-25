import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User, Admin, Roles, AuthenticatedUser } from './auth.types';
import { isAdmin, isUser } from './auth.typeguards';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: AuthenticatedUser | undefined;

  // TODO: do we really need this crap?
  authenticationCompleted = new EventEmitter();
  isAuthUser = new EventEmitter<boolean>();
  isAuthAdmin = new EventEmitter<Roles>();

  constructor(private readonly http: HttpClient) {
    this.handshake();
    this.authenticationCompleted.subscribe(
      () => {
        if (isUser(this.authenticated)) {
          this.isAuthUser.emit(true);
          this.isAuthAdmin.emit(undefined);
        }
        else if (isAdmin(this.authenticated)) {
          this.isAuthAdmin.emit(this.authenticated.role);
          this.isAuthUser.emit(false);
        }
      }
    );
  }

  handshake(): void {
    this.http.get(`${environment.authServiceUrl}handshake`, { withCredentials: true }).subscribe(
      (fromToken: any) => {
        this.authenticated = <User | Admin>fromToken;
        this.authenticationCompleted.emit();
      },
      (error: HttpErrorResponse) => this.clearAuth()
    );
  }

  login(credentials: { mail: string, password: string }): void {
    this.http.post<AuthenticatedUser>(`${environment.authServiceUrl}users/login`, credentials, { withCredentials: true }).subscribe(
      this.authenticate,
      (error: HttpErrorResponse) => this.clearAuth()
    );
  }

  logout(): void {
    this.http.post(`${environment.authServiceUrl}users/logout`, null, { withCredentials: true }).subscribe();
  }

  adminAccess(credentials: { internNum: string, password: string }): void {
    this.http.post<AuthenticatedUser>(`${environment.authServiceUrl}admin/access`, credentials, { withCredentials: true }).subscribe(
      this.authenticate,
      (error: HttpErrorResponse) => this.clearAuth()
    );
  }

  adminLogout(): void {
    this.http.post(`${environment.authServiceUrl}admin/logout`, null, { withCredentials: true }).subscribe();
  }

  private clearAuth(): void {
    this.authenticated = undefined;
    this.authenticationCompleted.emit();
    this.isAuthAdmin.emit(undefined);
    this.isAuthUser.emit(false);
  }

  private authenticate(authUser: AuthenticatedUser) {
    this.authenticated = authUser;
    if (isAdmin(this.authenticated))
      this.isAuthAdmin.emit(this.authenticated.role);
    else if (isUser(this.authenticated))
      this.isAuthUser.emit(true);
    this.authenticationCompleted.emit();
  }

  isAdmin() { return isAdmin(this.authenticated) }
  isUser() { return isUser(this.authenticated) }

  get isAuthenticated(): boolean {
    return !!this.authenticated;
  }

  // TODO: what if not admin... Can it be undefined?
  get role(): number {
    if (!isAdmin(this.authenticated))
      return -1;
    return this.authenticated.role;
  }

}
