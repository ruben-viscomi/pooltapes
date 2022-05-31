import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type ViewDocument = View & Document;

@Schema({ versionKey: false })
export class View {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'Number', required: true }) count: number;
  @Prop({ type: 'String', ref: 'User', required: true }) userId: string;
  @Prop({ type: 'String', required: true }) mediaId: string;

  @Prop({ type: 'String', ref: 'Video', required: true }) video: string;
  @Prop({ type: 'Number', default: () => Date.now(), required: true }) lastWatched: number;
  @Prop({ type: 'Number', default: 0, required: true }) watchTimeMarker: number; // ← time in seconds.

}

export const ViewSchema = SchemaFactory.createForClass(View);
