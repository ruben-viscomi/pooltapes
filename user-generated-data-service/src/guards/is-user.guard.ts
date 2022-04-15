import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class IsUserGuard implements CanActivate {

  constructor(private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;

    try {
      var decodedToken = this.jwt.verify(authToken);
    }
    catch (error) {
      return false;
    }

    const { id, nationality } = decodedToken;
    if (id && nationality) return true;

    return false;
  }

}
