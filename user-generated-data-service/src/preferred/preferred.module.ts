import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PreferredService } from './preferred.service';
import { PreferredController } from './preferred.controller';

@Module({
  imports: [AuthModule],
  controllers: [PreferredController],
  providers: [PreferredService]
})
export class PreferredModule {}
