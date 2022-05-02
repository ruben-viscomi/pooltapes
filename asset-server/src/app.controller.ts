import { Controller, Post, UseInterceptors, Param, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';
import { File } from './types/file.type';

import { IsMovieDto } from './dto/is-movie.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('upload/thumb/:id')
  @UseInterceptors(FileInterceptor('thumb'))
  uploadThumb(@Param('id') id: string, @Query() query: IsMovieDto, @UploadedFile() thumb: File): void {
    this.appService.processThumb(id, this.toBool(query.movie), thumb);
  }

  @Post('upload/banner/:id')
  @UseInterceptors(FileInterceptor('banner'))
  uploadBanner(@Param('id') id: string, @Query() query: IsMovieDto, @UploadedFile() banner: File): void {
    this.appService.processBanner(id, this.toBool(query.movie), banner);
  }

  @Post('upload/title-logo/:id')
  @UseInterceptors(FileInterceptor('titleLogo', { dest: 'public/tmp/' }))
  uploadTitleLogo(@Param('id') id: string, @Query() query: IsMovieDto, @UploadedFile() titleLogo: File): void {
    this.appService.processTitleLogo(id, this.toBool(query.movie), titleLogo);
  }

  @Post('upload/videoThumb/:id')
  @UseInterceptors(FileInterceptor('thumb', { dest: 'public/tmp/' }))
  uploadVideoThumb(@Param('id') id: string, @UploadedFile() thumb: File): void {
    this.appService.processVideoThumb(id, thumb);
  }

  private toBool(val: string): boolean {
    return (val === 'true') ? true : false;
  }

}
