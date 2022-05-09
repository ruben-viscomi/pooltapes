import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';

import { PinnedController } from './pinned.controller';
import { PinnedService } from './pinned.service';
import { PinnedRepository } from './pinned.repository';
import { Pinned, PinnedSchema } from './pinned.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pinned.name, schema: PinnedSchema }], 'metadata'),
    AuthModule,
    AdminModule,
    UsersModule,
    MoviesModule,
    SeriesModule
  ],
  controllers: [PinnedController],
  providers: [
    PinnedService,
    PinnedRepository
  ],
  exports: [MongooseModule]
})
export class PinnedModule {}
