import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { PreferredService } from './preferred.service';
import { PreferredController } from './preferred.controller';
import { Preferred, PreferredSchema } from './preferred.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preferred.name, schema: PreferredSchema }], 'user-generated'),
    AuthModule
  ],
  controllers: [PreferredController],
  providers: [PreferredService]
})
export class PreferredModule {}
