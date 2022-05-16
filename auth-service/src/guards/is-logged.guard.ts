import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';

import { AdminRepository } from '../admin/admin.repository';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class IsLoggedGuard implements CanActivate {

  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly userRepo: UserRepository,
    private readonly jwt: JwtService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;

    try {
      const decoded = this.jwt.verify(authToken, { secret: process.env.JWT_SECRET });
      const { id } = decoded;
      if (!id) return false;
      if (decoded.role !== undefined) return this.check(id, { isUser: false });
      return this.check(id, { isUser: true });
    }
    catch (error) {
      return false;
    }
  }

  async check(id: string, options: { isUser: boolean }): Promise<boolean> {
    const { isUser } = options;
    if (isUser) return !! await this.userRepo.findById(id, '_id');
    return !! await this.adminRepo.findById(id, '_id');
  }

}
