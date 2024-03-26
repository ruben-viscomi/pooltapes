import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticatedUser } from './auth.types';
import { isAdmin, isUser } from './auth.typeguards';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: AuthenticatedUser | undefined;
  authenticationCompleted = new EventEmitter();

  constructor(private readonly http: HttpClient) {
    this.handshake();
  }

  async handshake() {
    const authUser = await firstValueFrom(this.http.get<AuthenticatedUser>(`${environment.authServiceUrl}handshake`, { withCredentials: true }))
    this.authenticate(authUser);
  }

  // TODO: join logic for both admin and user access.
  async login(credentials: { mail: string, password: string }): Promise<void> {
    const authUser = await firstValueFrom(this.http.post<AuthenticatedUser>(`${environment.authServiceUrl}users/login`, credentials, { withCredentials: true }));
    this.authenticate(authUser);
  }

  async adminAccess(credentials: { internNum: string, password: string }): Promise<void> {
    const authUser = await firstValueFrom(this.http.post<AuthenticatedUser>(`${environment.authServiceUrl}admin/access`, credentials, { withCredentials: true }));
    this.authenticate(authUser);
  }

  // TODO: join logic for both admin and user logout.
  async logout(): Promise<void> {
    await firstValueFrom(this.http.post(`${environment.authServiceUrl}users/logout`, null, { withCredentials: true }));
  }

  async adminLogout(): Promise<void> {
    await firstValueFrom(this.http.post(`${environment.authServiceUrl}admin/logout`, null, { withCredentials: true }));
  }

  private authenticate(authUser?: AuthenticatedUser) {
    this.authenticated = authUser;
    this.authenticationCompleted.emit();
  }

  isAdmin() { return isAdmin(this.authenticated) }
  isUser() { return isUser(this.authenticated) }

  get isAuthenticated(): boolean { return !!this.authenticated }

  // TODO: what if not admin... Can it be undefined?
  get role(): number {
    if (!isAdmin(this.authenticated))
      return -1;
    return this.authenticated.role;
  }

}
