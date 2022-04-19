import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { Reaction, ReactionSchema } from './reaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reaction.name, schema: ReactionSchema }], 'user-generated'),
    AuthModule,
    MoviesModule,
    SeriesModule,
    UsersModule
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService]
})
export class ReactionsModule {}
