import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Season } from './season.type';

export type SeriesDocument = Series & Document;

@Schema({ versionKey: false })
export class Series {

  @Prop({ type: String, default: () => UUID(), dropDups: true }) _id: string; // UUID
  @Prop({ type: 'String' }) title: string;
  @Prop({ type: [{ type: 'String' }] }) search: string[];

  @Prop({ type: [{
    _id: false,
    season: 'Number',
    description: 'String',
    episodes: [{ type: 'String', ref: 'Video' }]
  }], required: true })
  seasons: Season[];

  @Prop({ type: [{ type: 'String', ref: 'Actor' }], required: true }) cast: string[]; // UUID
  @Prop({ type: 'Number', required: true }) views: number;
  @Prop({ type: 'Number', required: true }) likes: number;
  @Prop({ type: 'Number', required: true }) dislikes: number;
  @Prop({ type: 'Number' }) release: number;
  @Prop({ type: 'Number', required: true }) uploaded: number;
  @Prop({ type: 'Number' }) expires: number;
  @Prop({ type: ['String'] }) tags: string[];

}

export const SeriesSchema = SchemaFactory.createForClass(Series);
