import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type PreferredDocument = Preferred & Document;

@Schema({ versionKey: false })
export class Preferred {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() movie: boolean;
  @Prop({ type: 'String', ref: 'User' }) userId: string;
  @Prop() mediaId: string; // UUID

}

export const PreferredSchema = SchemaFactory.createForClass(Preferred);
