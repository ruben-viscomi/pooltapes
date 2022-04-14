import { Module } from '@nestjs/common';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [ReactionsModule]
})
export class AppModule {}
