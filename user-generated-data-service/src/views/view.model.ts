import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type ViewDocument = View & Document;

@Schema({ versionKey: false })
export class View {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'Number', required: true }) count: number;
  @Prop({ type: 'String', ref: 'User', required: true }) userId: string;
  @Prop({ type: 'Boolean', required: true }) movie: boolean;
  @Prop({ type: 'String', required: true }) mediaId: string;
  @Prop({ type: 'String', ref: 'Video', required: true }) video: string;

}

export const ViewSchema = SchemaFactory.createForClass(View);
