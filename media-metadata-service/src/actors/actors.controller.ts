import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actor.model';

import { CreateActorDto } from './dto/create-actor.dto';
import { QueryActorsDto } from './dto/query-actors.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {

  constructor(private actorsService: ActorsService) {}

  @Post()
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
  updateActor(@Param('id') id: string, @Body() updated: UpdateActorDto): Promise<void> {
    return this.actorsService.updateActor(id, updated);
  }

  @Delete(':id')
  deleteActor(@Param('id') id: string): Promise<void> {
    return this.actorsService.deleteActor(id);
  }

}
