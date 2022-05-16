import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminRepository } from './admin/admin.repository';
import { UserRepository } from './users/user.repository';
import { Admin } from './admin/admin.model';
import { User } from './users/user.model';

import { AuthenticatedDto } from './common/authenticated.dto';

@Injectable()
export class AppService {

  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly userRepo: UserRepository
  ) {}

  async handshake(authenticated: AuthenticatedDto): Promise<Admin | User> {
    const { id, isAdmin } = authenticated;
    var found: Admin | User = {} as User;
    if (isAdmin) found = await this.adminRepo.findById(id, '_id role');
    else found = await this.userRepo.findById(id, '_id nationality');
    if(!found) throw new NotFoundException();
    return found;
  }

}
