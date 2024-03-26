import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthUserGuard implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isAuthenticated) return this.handleAsync();
    return this.auth.isUser();
  }

  async handleAsync(): Promise<boolean | UrlTree> {
    await firstValueFrom(this.auth.authenticationCompleted);
    return this.auth.isUser();
  }

}
