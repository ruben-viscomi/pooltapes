import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedInterceptor implements NestInterceptor {

  constructor(private readonly jwt: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;
    if (!authToken) throw new UnauthorizedException();
    // if (!authToken) return next.handle();

    const decodedToken = this.jwt.verify(authToken);
    const id: string = decodedToken.id;
    const isAdmin: boolean = (decodedToken.role !== undefined) ? true : false;

    if (!id) throw new UnauthorizedException();
    // if (!id) return next.handle();

    request.authenticated = { id, isAdmin };
    return next.handle();
  }

}
