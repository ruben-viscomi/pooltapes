import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeriesService } from './series.service';
import { Series, SeriesSchema } from './series.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }], 'media-metadata')
  ],
  providers: [SeriesService],
  exports: [SeriesService, MongooseModule]
})
export class SeriesModule {}
