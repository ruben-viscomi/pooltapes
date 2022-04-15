import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type ViewDocument = View & Document;

@Schema({ versionKey: false })
export class View {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() count: number;
  @Prop({ type: 'String', ref: 'User' }) userId: string;
  @Prop() movie: boolean;
  @Prop() mediaId: string; // UUID
  @Prop({ type: 'String', ref: 'Video' }) videoId: string;

}

export const ViewSchema = SchemaFactory.createForClass(View);
