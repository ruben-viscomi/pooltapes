import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PinnedController } from './pinned.controller';
import { PinnedService } from './pinned.service';
import { PinnedRepository } from './pinned.repository';
import { Pinned, PinnedSchema } from './pinned.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pinned.name, schema: PinnedSchema }], 'metadata')
  ],
  controllers: [PinnedController],
  providers: [
    PinnedService,
    PinnedRepository
  ],
  exports: [MongooseModule]
})
export class PinnedModule {}
