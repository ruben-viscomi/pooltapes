import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type VideoDocument = Video & Document;

@Schema({ versionKey: false })
export class Video {

  @Prop({ type: 'String', default: () => UUID() }) _id: string;
  @Prop() description: string;
  @Prop() host: string;
  @Prop() audio: string[];
  @Prop() subtitles: string[];

}

export const VideoSchema = SchemaFactory.createForClass(Video);
