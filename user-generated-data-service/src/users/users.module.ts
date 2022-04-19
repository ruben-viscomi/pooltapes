import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { User, UserSchema } from './user.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'auth'),
  ],
  exports: [MongooseModule]
})
export class UsersModule {}
