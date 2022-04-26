import { Controller, Res, Post, Body, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AdminService } from './admin.service';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { AllowRoles } from '../decorators/allow-roles.decorator';
import { Roles } from '../common/roles.enum';
import { Admin } from './admin.model';

import { CreateAdminDto } from './dto/create-admin.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('admin')
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @UseGuards(IsAdminGuard)
  @AllowRoles(Roles.TECHNICAL)
  async createAdmin(@Body() createAdmin: CreateAdminDto): Promise<void> {
    await this.adminService.createAdmin(createAdmin);
  }

  @Post('access')
  async accessAsAdmin(@Res({ passthrough: true }) response: Response, @Body() credentials: CredentialsDto): Promise<Admin> {
    const { token, admin } = await this.adminService.accessAsAdmin(credentials);
    response.cookie('authToken', token, {
      secure: true,
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000
    });
    return admin;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie('authToken');
  }

}
