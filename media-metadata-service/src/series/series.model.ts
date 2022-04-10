import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as UUID } from 'uuid';

import { Season } from './season.type';

export type SeriesDocument = Series & Document;

@Schema({ versionKey: false })
export class Series {

  @Prop({ type: String, default: () => UUID() }) _id: string; // UUID
  @Prop() title: string;
  @Prop() search: string[];

  @Prop({ type: [{
    season: 'Number',
    description: 'String',
    episodes: { type: 'String', ref: 'Video' }
  }] })
  seasons: Season[];

  @Prop({ type: 'Array', ref: 'Actor' }) cast: string[]; // UUID
  @Prop() views: number;
  @Prop() likes: number;
  @Prop() dislikes: number;
  @Prop() release: number; // Date.now()
  @Prop() uploaded: number; // Date.now()
  @Prop() expires: number; // Date.now()

}

export const SeriesSchema = SchemaFactory.createForClass(Series);
