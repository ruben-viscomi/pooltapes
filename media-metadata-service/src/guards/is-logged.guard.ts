import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class IsLoggedGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authToken } = request.cookies;

    if (!authToken) return false;
    return true; // waiting for imports.

    // TODO: imports
    // try {
    //   const decoded = this.jwt.verify(authToken, { secret: process.env.JWT_SECRET });
    //   const { id } = decoded;
    //   if (decoded.role) return this.check(id, { isUser: false });
    //   return this.check(id, { isUser: true });
    // }
    // catch (error) {
    //   return false;
    // }
  }

  // TODO: imports
  // async check(id: string, options: { isUser: boolean }): Promise<boolean> {
  //   const { isUser } = options;
  //   if (isUser) return !! await this.userModel.findById(id);
  //   return !! await this.adminModel.findById(id);
  // }

}
