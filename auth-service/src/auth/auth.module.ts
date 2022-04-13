import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (conf: ConfigService) => ({
        secret: await conf.get<string>('JWT_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  exports: [JwtModule]
})
export class AuthModule {}
