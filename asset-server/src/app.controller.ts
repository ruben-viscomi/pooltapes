import { Controller, Post, UseInterceptors, Param, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';
import { File } from './types/file.type';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('upload/thumb/:id/:movie')
  @UseInterceptors(FileInterceptor('thumb'))
  uploadThumb(@Param('id') id: string, @Param('movie') movie, @UploadedFile() thumb: File): void {
    this.appService.processThumb(id, movie, thumb);
  }

  @Post('upload/banner/:id/:movie')
  @UseInterceptors(FileInterceptor('banner'))
  uploadBanner(@Param('id') id: string, @Param('movie') movie, @UploadedFile() banner: File): void {
    this.appService.processBanner(id, movie, banner);
  }

  @Post('upload/title-logo/:id/:movie')
  @UseInterceptors(FileInterceptor('titleLogo', { dest: 'public/tmp/' }))
  uploadTitleLogo(@Param('id') id: string, @Param('movie') movie, @UploadedFile() titleLogo: File): void {
    this.appService.processTitleLogo(id, movie, titleLogo);
  }

}
