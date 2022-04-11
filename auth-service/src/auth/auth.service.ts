import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.model';

import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {

  private readonly YEARS_18 = 567990000000;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp(personalInfo: CreateUserDto): Promise<void> {
    const { birthDate, mail } = personalInfo;
    // ↓ BUG: exceptions somehow won't get handled by NestJS and causes the server to CRASH ↓ //
    if (personalInfo.birthDate > Date.now() - 567990000000) throw new UnauthorizedException('to sign up you must be at least 18 years old');
    if (await this.userModel.findOne({ mail })) throw new ConflictException('user already exists');
    // ↑ BUG ↑ //
    await this.userModel.create(personalInfo);
  }

  async login(credentials: CredentialsDto): Promise<User> {
    const user: User = await this.userModel.findOne(credentials);
    if (!user) throw new BadRequestException('wrong mail or password');
    return user;
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
