import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

import { Pin } from './pin.type';

export type PinnedDocument = Pinned & Document;

@Schema({ versionKey: false })
export class Pinned {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', required: true, unique: true, dropDups: true }) section: string;
  @Prop({
    type: [{
      media: { type: 'String', required: true },
      movie: { type: 'Boolean', required: true }
    }],
    default: [],
    required: true
  }) media: Pin[];

}

export const PinnedSchema = SchemaFactory.createForClass(Pinned);
