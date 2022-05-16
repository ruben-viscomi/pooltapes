import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

import { AdminRepository } from './admin.repository';
import { Admin, AdminDocument } from './admin.model';

import { CreateAdminDto } from './dto/create-admin.dto';
import { CredentialsDto } from './dto/credentials.dto';


@Injectable()
export class AdminService {

  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly jwt: JwtService
  ) {}

  async createAdmin(createAdmin: CreateAdminDto): Promise<void> {
    const { internNum } = createAdmin;
    if (await this.adminRepo.findOne({ internNum })) throw new ConflictException('admin already exists');
    // TODO: create geth account
    const password: string = this.hashAndSalt(createAdmin.password);
    await this.adminRepo.create({ ...createAdmin, password });
  }


  async accessAsAdmin(credentials: CredentialsDto): Promise<{ token: string, admin: Admin }> {
    const password: string = this.hashAndSalt(credentials.password);
    const admin: Admin = await this.adminRepo.findOne({ ...credentials, password }, '_id role');
    if (!admin) throw new BadRequestException('wrong intern number or password');
    return {
      token: await this.jwt.sign({ id: admin._id, role: admin.role }),
      admin
    };
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
