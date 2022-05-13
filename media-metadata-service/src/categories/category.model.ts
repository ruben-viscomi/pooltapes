import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { DashPosition } from '../common/dash-position.type';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) title: string;
  @Prop({ type: ['String'], required: true }) search: string[];
  @Prop({ type: ['String'], default: [], required: true }) media: string[];
  @Prop({ type: 'Boolean', required: true }) movie: boolean;

  @Prop({ type: [{
    _id: false,
    position: 'Number',
    type: { type: 'Number' }
  }], default: [], required: false })
  dash: DashPosition[];

}

export const CategorySchema = SchemaFactory.createForClass(Category);
