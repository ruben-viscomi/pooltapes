import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Video, VideoSchema } from './video.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }], 'media-metadata')
  ],
  exports: [MongooseModule]
})
export class VideosModule {}
