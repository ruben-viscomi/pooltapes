import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Roles } from '../common/roles.enum';

export type AdminDocument = Admin & Document;

export class Admin {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() name: number;
  @Prop() internNum: string;
  @Prop() password: string;
  @Prop() role: Roles;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
