import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type PinnedDocument = Pinned & Document;

@Schema({ versionKey: false })
export class Pinned {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true, unique: true, dropDups: true }) section: string;
  @Prop({
    type: [{
      type: 'String',
      ref: 'Media'
    }],
    default: [],
    required: true
  }) media: string[];

}

export const PinnedSchema = SchemaFactory.createForClass(Pinned);
