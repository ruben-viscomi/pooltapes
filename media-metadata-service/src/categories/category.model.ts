import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() title: string;
  @Prop() search: string[];
  @Prop() mediaIds: string[]; // UUID[]
  @Prop() movies: boolean;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
