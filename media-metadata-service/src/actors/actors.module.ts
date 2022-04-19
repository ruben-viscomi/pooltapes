import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { Actor, ActorSchema } from './actor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }], 'metadata'),
    AuthModule
  ],
  controllers: [ActorsController],
  providers: [ActorsService]
})
export class ActorsModule {}
