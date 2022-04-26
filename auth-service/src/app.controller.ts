import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';
import { Admin } from './admin/admin.model';
import { User } from './users/user.model';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { AuthenticatedInterceptor } from './interceptors/authenticated.interceptor';
import { Authenticated } from './decorators/authenticated.decorator';

import { AuthenticatedDto } from './common/authenticated.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('handshake')
  @UseGuards(IsLoggedGuard)
  @UseInterceptors(AuthenticatedInterceptor)
  async handshake(@Authenticated() authenticated: AuthenticatedDto): Promise<User | Admin> {
    return this.appService.handshake(authenticated);
  }

}
