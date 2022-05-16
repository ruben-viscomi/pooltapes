import { Module } from '@nestjs/common';
import { MongooseModule } from  '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { Admin, AdminSchema } from './admin.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository
  ],
  exports: [
    MongooseModule,
    AdminRepository
  ]
})
export class AdminModule {}
