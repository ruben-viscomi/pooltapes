import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { Media, MediaSchema } from './media.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }], 'media-metadata')
  ],
  providers: [
    MediaService,
    MediaRepository
  ],
  exports: [
    MongooseModule,
    MediaService
  ]
})
export class MediaModule {}
