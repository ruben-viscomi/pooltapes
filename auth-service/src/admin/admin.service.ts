import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Admin, AdminDocument } from './admin.model';

import { CreateAdminDto } from './dto/create-admin.dto';
import { CredentialsDto } from './dto/credentials.dto';


@Injectable()
export class AdminService {

  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async createAdmin(createAdmin: CreateAdminDto): Promise<void> {
    // TODO: check if duplicate and create geth account
    this.adminModel.create(createAdmin);
  }


  async accessAsAdmin(credentials: CredentialsDto): Promise<Admin> {
    // TODO: return JWT with { id, role }
    return this.adminModel.findOne(credentials);
  }

}
