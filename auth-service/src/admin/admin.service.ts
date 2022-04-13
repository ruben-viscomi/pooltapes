import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'crypto';

import { Admin, AdminDocument } from './admin.model';

import { CreateAdminDto } from './dto/create-admin.dto';
import { CredentialsDto } from './dto/credentials.dto';


@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwt: JwtService
  ) {}

  async createAdmin(createAdmin: CreateAdminDto): Promise<void> {
    const { internNum } = createAdmin;
    if (await this.adminModel.findOne({ internNum })) throw new ConflictException('admin already exists');
    // TODO: create geth account
    const password: string = this.hashAndSalt(createAdmin.password);
    await this.adminModel.create({ ...createAdmin, password });
  }


  async accessAsAdmin(credentials: CredentialsDto): Promise<string> {
    const password: string = this.hashAndSalt(credentials.password);
    const admin: Admin = await this.adminModel.findOne({ ...credentials, password });
    if (!admin) throw new BadRequestException('wrong intern number or password');
    return await this.jwt.sign({ id: admin._id, role: admin.role });
  }

  private hashAndSalt(password: string): string {
    const replacer: RegExp = new RegExp(password.charAt(4), 'g');
    return createHash(process.env.HASHING_ALGORITHM).update(
      process.env.HASHING_SALT +
      password.replace(
        replacer,
        password.charAt(4) + process.env.HASHING_SALT.substring(
          password.charCodeAt(2),
          password.length
        )
      ) +
      process.env.HASHING_SALT
    ).digest('hex');
  }

}
