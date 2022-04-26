import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Admin, AdminDocument } from '../admin/admin.model';
import { User, UserDocument } from '../users/user.model';

@Injectable()
export class IsLoggedGuard implements CanActivate {

  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
    if (isUser) return !! await this.userModel.findById(id, '_id');
    return !! await this.adminModel.findById(id, '_id');
  }

}
