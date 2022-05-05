import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type MovieDocument = Movie & Document;

@Schema({ versionKey: false })
export class Movie {

  @Prop({ type: String, default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) title: string;
  @Prop({ type: [{ type: 'String' }], required: true }) search: string[];
  @Prop({ type: 'String', ref: 'Video' }) video: string;
  @Prop({ type: [{ type: 'String', ref: 'Actor' }], default: [], required: true }) cast: string[];
  @Prop({ type: 'Number', default: 0, required: true }) views: number;
  @Prop({ type: 'Number', default: 0, required: true }) likes: number;
  @Prop({ type: 'Number', default: 0, required: true }) dislikes: number;
  @Prop({ type: 'Number' }) release: number;
  @Prop({ type: 'Number', default: () => Date.now(), required: true }) uploaded: number;
  @Prop({ type: 'Number' }) expires: number;
  @Prop({ type: ['String'], default: [] }) tags: string[];

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
