import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { File } from './types/file.type';

@Injectable()
export class AppService {

  processThumb(id: string, movie: boolean, thumb: File): void {
    this.createFolderSafe(this.getDestDirPath(id, movie));
    fs.rename(
      `./public/tmp/${thumb.filename}`,
      this.getDestFilePath(id, movie, 'thumb', thumb),
      (err: any) => {
        if (err) console.log(err);
      }
    );
  }

  processBanner(id: string, movie: boolean, banner: File): void {
    this.createFolderSafe(this.getDestDirPath(id, movie));
    fs.rename(
      `./public/tmp/${banner.filename}`,
      this.getDestFilePath(id, movie, 'banner', banner),
      (err: any) => {
        if (err) console.log(err);
      }
    );
  }

  processTitleLogo(id: string, movie: boolean, titleLogo: File): void {
    this.createFolderSafe(this.getDestDirPath(id, movie));
    fs.rename(
      `./public/tmp/${titleLogo.filename}`,
      this.getDestFilePath(id, movie, 'title-logo', titleLogo),
      (err: any) => {
        if (err) console.log(err);
      }
    );
  }

  processVideoThumb(id: string, thumb: File): void {
    this.createFolderSafe(`./public/videos/${id}`);
    fs.rename(
      `./public/tmp/${thumb.filename}`,
      `./public/videos/${id}/thumb${path.extname(thumb.originalname)}`,
      (err: any) => {
        if (err) console.log(err);
      }
    );

  }

  private createFolderSafe(path: string): void {
    if (!fs.existsSync(path))
      fs.mkdirSync(path);
  }

  private getDestFilePath(id: string, movie: boolean, fileType: string, file: File): string {
    const mediaFolder: string = movie ? 'movies' : 'series';
    return this.getDestDirPath(id, movie) + `/${fileType}${path.extname(file.originalname)}`;
  }

  private getDestDirPath(id: string, movie: boolean): string {
    const mediaFolder: string = movie ? 'movies' : 'series';
    return `./public/${mediaFolder}/${id}`;
  }

}
