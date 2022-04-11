import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {

  async signUp(personalInfo: CreateUserDto): Promise<any> {
    if (personalInfo.birthDate > Date.now() - 567990000000) throw new UnauthorizedException('to sign up you must be at least 18 years old');
    return `sign-up account: ${JSON.stringify(personalInfo)}`;
  }

  async login(credentials: CredentialsDto): Promise<any> {
    return `login account: ${JSON.stringify(credentials)}`;
  }

  // async search(query: any): Promise<any> {
  //   return `accounts[] with query: ${JSON.stringify(query)}`;
  // }
  //
  // async updateAccount(id: string, updated: any): Promise<void> {
  //   console.log(`updated account with id: ${id} as ${JSON.stringify(updated)}`);
  // }
  //
  // async deleteAccount(id: string): Promise<void> {
  //   console.log(`deleted account with id: ${id}`);
  // }

}
