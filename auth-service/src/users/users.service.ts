import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'crypto';

import { User, UserDocument } from './user.model';

import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class UsersService {

  private readonly YEARS_18 = 567990000000;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwt: JwtService
  ) {}

  async signUp(personalInfo: CreateUserDto): Promise<void> {
    const { birthDate, mail } = personalInfo;
    if (birthDate > Date.now() - this.YEARS_18) throw new UnauthorizedException('to sign up you must be at least 18 years old');
    if (await this.userModel.findOne({ mail })) throw new ConflictException('user already exists');
    const init = {
      password: this.hashAndSalt(personalInfo.password),
      signedUp: Date.now(),
      verified: false
    }
    await this.userModel.create({ ...personalInfo, ...init });
  }

  async login(credentials: CredentialsDto): Promise<{ token: string, user: User }> {
    const password: string = this.hashAndSalt(credentials.password);
    const user: User = await this.userModel.findOne({ ...credentials, password }, '_id nationality');
    if (!user) throw new BadRequestException('wrong mail or password');

    return {
      token: await this.jwt.sign({ id: user._id, nationality: user.nationality }),
      user
    };
  }

  private hashAndSalt(password: string): string {
    const replacer: RegExp = new RegExp(password.charAt(3), 'g');
    return createHash(process.env.HASHING_ALGORITHM).update(
      process.env.HASHING_SALT +
      password.replace(
        replacer,
        password.charAt(3) + process.env.HASHING_SALT.substring(
          password.charCodeAt(5),
          password.length
        )
      ) +
      process.env.HASHING_SALT
    ).digest('hex');
  }

}
