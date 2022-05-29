import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type VideoDocument = Video & Document;

@Schema({ versionKey: false })
export class Video {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String' }) description: string;
  @Prop({ type: 'String', required: true }) host: string;
  @Prop({ type: ['String'], required: true }) audio: string[];
  @Prop({ type: ['String'], required: true }) subtitles: string[];
  @Prop({ type: 'Number', required: true }) endMarker: number; // ← used to trigger a view completion

}

export const VideoSchema = SchemaFactory.createForClass(Video);
