import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

import { Roles } from '../models/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class IsAuthAdminGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role: Roles = route.data['role'];
    console.log(role);

    if (role === undefined)
      return this.auth.isAdmin() ? true : this.router.createUrlTree(['login', 'admin']);

    return this.auth.isAdmin() && this.auth.role === role;
  }

  // TODO: handle async 'handshake'


}
