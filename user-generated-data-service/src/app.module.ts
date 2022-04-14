import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ReactionsModule } from './reactions/reactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    ReactionsModule,
    AuthModule
  ]
})
export class AppModule {}
