import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Media } from '../media/media.model';

export type MovieDocument = Movie & Document;

@Schema({ versionKey: false })
export class Movie extends Media {

  @Prop({ type: 'String', ref: 'Video' }) video: string;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
