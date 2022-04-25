import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      preservePath: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
