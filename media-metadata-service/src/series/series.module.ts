import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';

import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { Series, SeriesSchema } from './series.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule
  ],
  controllers: [SeriesController],
  providers: [SeriesService]
})
export class SeriesModule {}
