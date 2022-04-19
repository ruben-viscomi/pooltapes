import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actor.model';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { IsLoggedGuard } from '../guards/is-logged.guard';
import { AllowRoles } from '../decorators/allow-roles.decorator';
import { Roles } from '../common/roles.enum';

import { CreateActorDto } from './dto/create-actor.dto';
import { QueryActorsDto } from './dto/query-actors.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
@UseGuards(IsAdminGuard)
export class ActorsController {

  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @AllowRoles(Roles.CONTENT)
  createActor(@Body() actor: CreateActorDto): Promise<Actor> {
    return this.actorsService.createActor(actor);
  }

  @Get()
  @UseGuards(IsLoggedGuard)
  getActors(@Query() query: QueryActorsDto): Promise<Actor[]> {
    return this.actorsService.getActors(query);
  }

  @Get(':id')
  @UseGuards(IsLoggedGuard)
  getActor(@Param('id') id: string): Promise<Actor> {
    return this.actorsService.getActor(id);
  }

  @Patch(':id')
  @AllowRoles(Roles.CONTENT)
  updateActor(@Param('id') id: string, @Body() updated: UpdateActorDto): Promise<void> {
    return this.actorsService.updateActor(id, updated);
  }

  @Delete(':id')
  @AllowRoles(Roles.CONTENT)
  deleteActor(@Param('id') id: string): Promise<void> {
    return this.actorsService.deleteActor(id);
  }

}
