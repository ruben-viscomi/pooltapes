import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';
import { VideosModule } from '../videos/videos.module';
import { MediaModule } from '../media/media.module';

import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { SeriesRepository } from './series.repository';
// import { Series, SeriesSchema } from './series.model';
import { Media, MediaSchema } from '../media/media.model';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }], 'metadata'),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule,
    VideosModule,
    MediaModule
  ],
  controllers: [SeriesController],
  providers: [
    SeriesService,
    SeriesRepository
  ],
  exports: [MongooseModule]
})
export class SeriesModule {}
