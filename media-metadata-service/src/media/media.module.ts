import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Media, MediaSchema } from './media.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }], 'metadata')
  ],
  exports: [MongooseModule]
})
export class MediaModule {}
