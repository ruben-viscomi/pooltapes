import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
