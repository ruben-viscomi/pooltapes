import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Admin, AdminDocument } from './admin/admin.model';
import { User, UserDocument } from './users/user.model';
import { AuthenticatedDto } from './common/authenticated.dto';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async handshake(authenticated: AuthenticatedDto): Promise<Admin | User> {
    const { id, isAdmin } = authenticated;
    var found: Admin | User = {} as User;
    if (isAdmin) found = await this.adminModel.findById(id, '_id role');
    else found = await this.userModel.findById(id, '_id nationality');
    if(!found) throw new NotFoundException();
    return found;
  }

}
