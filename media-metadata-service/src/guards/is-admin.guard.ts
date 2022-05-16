import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { AdminRepository } from '../admin/admin.repository';
import { Roles } from '../common/roles.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
    private readonly adminRepo: AdminRepository
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles: number[] = this.reflector.get<number[]>('roles', context.getHandler());
    if (!allowedRoles) return true;
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;

    try {
      var decodedAdmin = this.jwt.verify(authToken, { secret: process.env.JWT_SECRET });
    }
    catch (error) {
      return false;
    }
    const { role: adminRole, id } = decodedAdmin;
    if (adminRole === undefined || !id) return false;
    if (!this.matchRoles(adminRole, allowedRoles)) return false;
    return this.checkAdmin(id);
  }

  matchRoles(adminRole: Roles, roles: Roles[]): boolean {
    for (let role in roles)
      if (<Roles>+role === adminRole) return true;
    return false;
  }

  async checkAdmin(id: string): Promise<boolean> {
    return !! await this.adminRepo.findById(id, '_id');
  }

}
