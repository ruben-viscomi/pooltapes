import { Controller, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';

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
  async accessAsAdmin(@Res({ passthrough: true }) response: Response, @Body() credentials: CredentialsDto): Promise<void> {
    response.cookie('authToken', await this.adminService.accessAsAdmin(credentials));
  }

}
