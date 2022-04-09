import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as UUID } from 'uuid';

export type MovieDocument = Movie & Document;

@Schema({ versionKey: false })
export class Movie {
  @Prop({ type: String, default: () => UUID() }) _id: string; // UUID
  @Prop() title: string;
  @Prop() search: string[];
  @Prop({ type: 'String', ref: 'Video' }) videoId: string; // UUID
  @Prop({ type: 'Array', ref: 'Actor' }) cast: string[]; // UUID
  @Prop() views: number;
  @Prop() likes: number;
  @Prop() dislikes: number;
  @Prop() release: number; // Date.now()
  @Prop() uploaded: number; // Date.now()
  @Prop() expires: number; // Date.now()
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
