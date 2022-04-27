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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.auth.isHandshakeComplete()) return this.handleAsync();
    console.log('canActivate: ', !this.auth.isAdmin() && this.auth.isAuthenticated()); // TODO: remove if debugged
    return !this.auth.isAdmin() && this.auth.isAuthenticated();
  }

  handleAsync(): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.auth.isHandshakedUser.subscribe(
        (isUser: boolean) => {
          if (isUser) resolve(true);
          else resolve(this.router.createUrlTree(['login']));
        }
      );
    });
  }

}
