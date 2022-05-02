import { Controller, Post, Get, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from './types/file.type';

import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('can-host')
  getHello(): boolean {
    return this.appService.canHost();
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('videoFile'))
  upload(@Param('id') id: string, @UploadedFile() videoFile: File): any {
    this.appService.convert(id, videoFile);
    return {
      id,
      originalName: videoFile.originalname,
      filename: videoFile.filename
    };
  }

  @Post('upload/thumb/:id')
  @UseInterceptors(FileInterceptor('thumb'))
  uploadThumb(@Param('id') id: string, @UploadedFile() thumb: File): void {
    this.appService.processThumb(id, thumb);
  }

  @Post('upload/banner/:id')
  @UseInterceptors(FileInterceptor('banner'))
  uploadBanner(@Param('id') id: string, @UploadedFile() banner: File): void {
    this.appService.processBanner(id, banner);
  }

  @Post('upload/title-logo/:id')
  @UseInterceptors(FileInterceptor('titleLogo'))
  uploadTitleLogo(@Param('id') id: string, @UploadedFile() titleLogo: File): void {
    this.appService.processTitleLogo(id, titleLogo);
  }

}
