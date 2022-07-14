import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  handleAsync(): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.auth.isAuthUser.subscribe(
        (isUser: boolean) => {
          if (isUser) resolve(true);
          else resolve(this.router.createUrlTree(['login']));
        }
      );
    });
  }

}
