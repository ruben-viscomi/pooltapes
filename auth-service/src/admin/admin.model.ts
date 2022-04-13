import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Roles } from '../common/roles.enum';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() name: string;
  @Prop() internNum: string;
  @Prop() password: string;
  @Prop() role: Roles;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
