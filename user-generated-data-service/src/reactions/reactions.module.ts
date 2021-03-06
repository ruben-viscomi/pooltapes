import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MediaModule } from '../media/media.module'

import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { ReactionRepository } from './reaction.repository';
import { Reaction, ReactionSchema } from './reaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reaction.name, schema: ReactionSchema }], 'user-generated'),
    AuthModule,
    UsersModule,
    MediaModule
  ],
  controllers: [ReactionsController],
  providers: [
    ReactionsService,
    ReactionRepository
  ]
})
export class ReactionsModule {}
