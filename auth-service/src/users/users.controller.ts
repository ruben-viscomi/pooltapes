import { Controller, Res, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() personalInfo: CreateUserDto): Promise<void> {
    await this.usersService.signUp(personalInfo);
  }

  @Post('login')
  async login(@Res({ passthrough: true }) response: Response, @Body() credentials: CredentialsDto): Promise<void> {
    response.cookie('authToken', await this.usersService.login(credentials));
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie('authToken');
  }

}
