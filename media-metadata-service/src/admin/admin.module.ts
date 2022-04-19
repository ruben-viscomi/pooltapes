import { Module } from '@nestjs/common';
import { MongooseModule } from  '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { Admin, AdminSchema } from './admin.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }], 'auth')
  ],
  exports: [MongooseModule]
})
export class AdminModule {}
