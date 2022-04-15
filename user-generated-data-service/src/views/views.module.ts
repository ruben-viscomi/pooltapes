import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { View, ViewSchema } from './view.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }], 'user-generated'),
    AuthModule,
    MoviesModule,
    SeriesModule
  ],
  controllers: [ViewsController],
  providers: [ViewsService]
})
export class ViewsModule {}
