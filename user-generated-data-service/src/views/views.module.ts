import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MediaModule } from '../media/media.module';
import { VideosModule } from '../videos/videos.module';

import { ViewsService } from './views.service';
import { ViewRepository } from './view.repository';
import { ViewsController } from './views.controller';
import { View, ViewSchema } from './view.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }], 'user-generated'),
    AuthModule,
    UsersModule,
    MediaModule,
    VideosModule
  ],
  controllers: [ViewsController],
  providers: [
    ViewsService,
    ViewRepository
  ]
})
export class ViewsModule {}
