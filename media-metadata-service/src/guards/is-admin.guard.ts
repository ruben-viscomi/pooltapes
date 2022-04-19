import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../admin/admin.model';

import { Roles } from '../common/roles.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>
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
      const decodedAdmin = this.jwt.verify(authToken, { secret: process.env.JWT_SECRET });
      const { role: adminRole, id } = decodedAdmin;
      if (adminRole === undefined || !id) return false;
      if (!this.matchRoles(adminRole, allowedRoles)) return false;
      // if (decodedAdmin.role === Roles.CONTENT) return true;
      // return false;
      return this.checkAdmin(id);
    }
    catch (error) {
      return false;
    }
  }

  matchRoles(adminRole: Roles, roles: Roles[]): boolean {
    for (let role in roles)
      if (<Roles>+role === adminRole) return true;
    return false;
  }

  async checkAdmin(id: string): Promise<boolean> {
    return !! await this.adminModel.findById(id, '_id');
  }

}
