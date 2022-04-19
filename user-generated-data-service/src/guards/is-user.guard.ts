import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.model';

@Injectable()
export class IsUserGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

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

    const { id } = decodedToken;
    if (!id) return false;
    return this.check(id);
  }

  async check(id: string): Promise<boolean> {
    return !! await this.userModel.findById(id, '_id');
  }

}
