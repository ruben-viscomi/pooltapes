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

  // @Post('convert')
  // convert(@Body() params: any): void {
  //   const { id, filename } = params
  //   this.appService.convert(id, filename);
  // }

}
