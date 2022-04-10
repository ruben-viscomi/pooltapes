import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { Actor, ActorSchema } from './actor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])
  ],
  controllers: [ActorsController],
  providers: [ActorsService]
})
export class ActorsModule {}
