import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserRepository } from '../users/user.repository';

@Injectable()
export class IsUserGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService,
    private readonly userRepo: UserRepository
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;
    console.log(authToken);

    try {
      var decodedToken = this.jwt.verify(authToken, { secret: process.env.JWT_SECRET });
    }
    catch (error) {
      return false;
    }

    const { id } = decodedToken;
    if (!id) return false;
    return this.check(id);
  }

  async check(id: string): Promise<boolean> {
    return !! await this.userRepo.findById(id, '_id');
  }

}
