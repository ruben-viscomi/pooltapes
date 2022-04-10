import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Gender } from './gender.enum';

export type ActorDocument = Actor & Document;

@Schema({ versionKey: false })
export class Actor {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() name: string;
  @Prop() search: string[];
  @Prop() nationality: string;
  @Prop() birthdate: number;
  @Prop() gender: Gender;

}

export const ActorSchema = SchemaFactory.createForClass(Actor);
