import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(private readonly jwt: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // TODO: get 'user' from 'authToken' and set it to request.user .
    const request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;
    if (!authToken) throw new UnauthorizedException();

    const decodedToken = this.jwt.verify(authToken);
    const id: string = decodedToken.id;

    if (!id) throw new UnauthorizedException();

    request.userId = id;

    return next.handle();
  }
}
