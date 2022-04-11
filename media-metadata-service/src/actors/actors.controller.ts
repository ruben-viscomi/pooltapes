import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actor.model';
import { IsAdminGuard } from '../guards/is-admin.guard';

import { CreateActorDto } from './dto/create-actor.dto';
import { QueryActorsDto } from './dto/query-actors.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {

  constructor(private actorsService: ActorsService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  createActor(@Body() actor: CreateActorDto): Promise<Actor> {
    return this.actorsService.createActor(actor);
  }

  @Get()
  getActors(@Query() query: QueryActorsDto): Promise<Actor[]> {
    return this.actorsService.getActors(query);
  }

  @Get(':id')
  getActor(@Param('id') id: string): Promise<Actor> {
    return this.actorsService.getActor(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  updateActor(@Param('id') id: string, @Body() updated: UpdateActorDto): Promise<void> {
    return this.actorsService.updateActor(id, updated);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  deleteActor(@Param('id') id: string): Promise<void> {
    return this.actorsService.deleteActor(id);
  }

}
