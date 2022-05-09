import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Dash } from '../common/dash.enum';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) title: string;
  @Prop({ type: [{ type: 'String' }], required: true }) search: string[];
  @Prop({ type: [{ type: 'String' }], default: [], required: true }) media: string[];
  @Prop({ type: 'Boolean', required: true }) movie: boolean;
  @Prop({ type: ['Number'], required: false }) dash: Dash[];

}

export const CategorySchema = SchemaFactory.createForClass(Category);
