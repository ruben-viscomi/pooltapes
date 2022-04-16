import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type MovieDocument = Movie & Document;

@Schema({ versionKey: false })
export class Movie {

  @Prop({ type: String, default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) title: string;
  @Prop({ type: [{ type: 'String' }], required: true }) search: string[];
  @Prop({ type: 'String', ref: 'Video' }) videoId: string;
  @Prop({ type: [{ type: 'String', ref: 'Video' }], required: true }) cast: string[];
  @Prop({ type: 'Number', required: true }) views: number;
  @Prop({ type: 'Number', required: true }) likes: number;
  @Prop({ type: 'Number', required: true }) dislikes: number;
  @Prop({ type: 'Number' }) release: number;
  @Prop({ type: 'Number', required: true }) uploaded: number;
  @Prop({ type: 'Number' }) expires: number;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
