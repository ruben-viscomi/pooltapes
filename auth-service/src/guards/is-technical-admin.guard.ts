import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { Roles } from '../common/roles.enum';

@Injectable()
export class IsTechnicalAdminGuard implements CanActivate {

  constructor(private jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;

    try {
      const decodedToken = this.jwt.verify(authToken);
      if (decodedToken.role === Roles.TECHNICAL) return true;
      return false
    }
    catch (error) {
      return false;
    }

  }
}
