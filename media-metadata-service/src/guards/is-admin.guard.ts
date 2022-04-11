import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { Roles } from '../common/roles.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {

  constructor(private jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;

    try {
      const decodedAdmin = this.jwt.verify(authToken, { secret: process.env.JWT_SECRET });
      if (decodedAdmin.role === Roles.CONTENT) return true;
      return false;
    }
    catch (error) {
      return false;
    }
  }

}
