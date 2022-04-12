import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

import { CreateAdminDto } from './dto/create-admin.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('admin')
export class AdminController {

  constructor(private adminService: AdminService) {}

  @Post('register')
  async createAdmin(@Body() createAdmin: CreateAdminDto): Promise<void> {
    await this.adminService.createAdmin(createAdmin);
  }

  @Post('access')
  async accessAsAdmin(@Body() credentials: CredentialsDto): Promise<void> {
    await this.adminService.accessAsAdmin(credentials);
  }

}
