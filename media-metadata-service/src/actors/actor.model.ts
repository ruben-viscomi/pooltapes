import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Gender } from './gender.enum';

export type ActorDocument = Actor & Document;

@Schema({ versionKey: false })
export class Actor {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) name: string;
  @Prop({ type: 'String', required: true }) search: string[];
  @Prop({ type: 'String' }) nationality: string;
  @Prop({ type: 'String' }) birthdate: number;
  @Prop({ type: 'Number' }) gender: Gender;

}

export const ActorSchema = SchemaFactory.createForClass(Actor);
