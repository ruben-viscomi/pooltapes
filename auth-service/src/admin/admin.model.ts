import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Roles } from '../common/roles.enum';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) name: string;
  @Prop({ type: 'String', required: true, unique: true, dropDups: true }) internNum: string;
  @Prop({ type: 'String', required: true }) password: string;
  @Prop({ type: 'Number', required: true }) role: Roles;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
