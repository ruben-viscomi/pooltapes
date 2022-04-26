import { Module } from '@nestjs/common';
import { MongooseModule } from  '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [MongooseModule]
})
export class AdminModule {}
