import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type FavoriteDocument = Favorite & Document;

@Schema({ versionKey: false })
export class Favorite {

  @Prop({ type: 'String', default: () => UUID(), dropDups: true }) _id: string;
  @Prop({ type: 'String', ref: 'User', required: true }) userId: string;
  @Prop({ type: 'String', required: true }) media: string;
  @Prop({ type: 'Number', default: () => Date.now(), required: true, index: true }) added: number;

}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
