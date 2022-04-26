import { Controller, Res, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { User } from './user.model';

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
  async login(@Res({ passthrough: true }) response: Response, @Body() credentials: CredentialsDto): Promise<User> {
    const { token, user } = await this.usersService.login(credentials);
    response.cookie('authToken', token, {
      // secure: true, // TODO: enable when service is converted to use 'HTTPS' or 'SPDY'
      // httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000
    });
    return user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie('authToken');
  }

}
