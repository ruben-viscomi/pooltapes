import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type ReactionDocument = Reaction & Document;

@Schema({ versionKey: false })
export class Reaction {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'Boolean', required: true }) like: boolean;
  @Prop({ type: 'String', ref: 'User', required: true }) userId: string;
  @Prop({ type: 'Boolean', required: true }) movie: boolean;
  @Prop({ type: 'String', required: true }) mediaId: string;

}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
