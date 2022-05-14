import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';


import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { ActorRepository } from './actor.repository';
import { Actor, ActorSchema } from './actor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule
  ],
  controllers: [ActorsController],
  providers: [
    ActorsService,
    ActorRepository
  ]
})
export class ActorsModule {}
