import { Schema,  Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {

  @Prop({ type: 'String', default: () =>  UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) name: string;
  @Prop({ type: 'String', required: true, unique: true, dropDups: true }) mail: string;
  @Prop({ type: 'String', required: true }) password: string;
  @Prop({ type: 'String' }) phone: string;
  @Prop({ type: 'Number', required: true }) birthDate: number;
  @Prop({ type: 'String', required: true }) nationality: string;
  @Prop({ type: 'String', required: true }) address: string;
  @Prop({ type: 'Number', required: true }) signedUp: number;
  @Prop({ type: 'Boolean', required: true }) verified: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
