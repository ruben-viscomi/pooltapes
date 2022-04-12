import { Controller, Res, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() personalInfo: CreateUserDto): Promise<void> {
    await this.authService.signUp(personalInfo);
  }

  @Post('login')
  async login(@Res({ passthrough: true }) response: Response, @Body() credentials: CredentialsDto): Promise<void> {
    response.cookie('authToken', await this.authService.login(credentials));
  }

  // @Get('search')
  // search(@Query() query: any): Promise<any> {
  //   return this.authService.search(query);
  // }
  //
  // @Patch('account/:id')
  // updateAccount(@Param('id') id: string, updated: any): void {
  //   this.authService.updateAccount(id, updated);
  // }
  //
  // @Delete('account/:id')
  // deleteAccount(@Param('id') id: string): void {
  //   this.authService.deleteAccount(id);
  // }

}
