import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { SeriesModule } from '../series/series.module';
import { PreferredService } from './preferred.service';
import { PreferredController } from './preferred.controller';
import { Preferred, PreferredSchema } from './preferred.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preferred.name, schema: PreferredSchema }], 'user-generated'),
    AuthModule,
    UsersModule,
    MoviesModule,
    SeriesModule
  ],
  controllers: [PreferredController],
  providers: [PreferredService]
})
export class PreferredModule {}
