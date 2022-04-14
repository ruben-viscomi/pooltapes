import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type ReactionDocument = Reaction & Document;

@Schema({ versionKey: false })
export class Reaction {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() like: boolean;
  @Prop({ type: 'String', ref: 'User' }) userId: string;
  @Prop() movie: boolean;
  @Prop() mediaId: string;

}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
