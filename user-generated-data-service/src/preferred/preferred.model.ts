import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type PreferredDocument = Preferred & Document;

@Schema({ versionKey: false })
export class Preferred {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'Boolean', required: true }) movie: boolean;
  @Prop({ type: 'String', ref: 'User', required: true }) userId: string;
  @Prop({ type: 'String', required: true }) media: string;

}

export const PreferredSchema = SchemaFactory.createForClass(Preferred);
