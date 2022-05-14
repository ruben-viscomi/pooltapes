import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';


import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideoRepository } from './video.repository';
import { Video, VideoSchema } from './video.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule
  ],
  controllers: [VideosController],
  providers: [
    VideosService,
    VideoRepository
  ],
  exports: [VideosService]
})
export class VideosModule {}
