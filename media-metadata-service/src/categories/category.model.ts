import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true }) title: string;
  @Prop({ type: [{ type: 'String' }], required: true }) search: string[];
  @Prop({ type: [{ type: 'String' }], required: true }) mediaIds: string[];
  @Prop({ type: 'Boolean', required: true }) movies: boolean;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
