import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VideoRepository } from './video.repository';

import { Video, VideoSchema } from './video.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }], 'media-metadata')
  ],
  providers: [VideoRepository],
  exports: [
    MongooseModule,
    VideoRepository
  ]
})
export class VideosModule {}
