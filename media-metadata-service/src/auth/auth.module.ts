import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (conf: ConfigService) => ({
        secret: conf.get<string>('JWT_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  exports: [JwtModule]
})
export class AuthModule {}
