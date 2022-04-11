import { Schema,  Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {

  @Prop({ type: 'String', default: () =>  UUID() }) _id: string; // UUID
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) mail: string;
  @Prop({ required: true }) password: string;
  @Prop() phone: string;
  @Prop({ required: true }) birthDate: number;
  @Prop() nationality: string;
  @Prop() address: string;
  @Prop() signedUp: number;
  @Prop() verified: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
