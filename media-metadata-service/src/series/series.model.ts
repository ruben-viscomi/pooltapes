import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Media } from '../media/media.model';
import { Season } from './season.type';

export type SeriesDocument = Series & Document;

@Schema({ versionKey: false })
export class Series extends Media {

  @Prop({ type: [{
    _id: false,
    season: 'Number',
    episodes: [{ type: 'String', ref: 'Video' }]
  }], default: [], required: true })
  seasons: Season[];

}

export const SeriesSchema = SchemaFactory.createForClass(Series);
