import { Injectable, BadRequestException } from '@nestjs/common';

import { MediaRepository } from './media.repository';
import { Media, MediaDocument } from './media.model';

@Injectable()
export class MediaService {

  constructor(private readonly mediaRepo: MediaRepository) {}

  async like(id: string, options: any): Promise<void> {
    const { isChange } = options;
    const media: MediaDocument = await this.mediaRepo.findById(id);
    if (!media) throw new BadRequestException('media doesn\'t exists');
    media.likes += 1;
    if (isChange) media.dislikes -= 1;
    await media.save();
  }

  async dislike(id: string, options: any): Promise<void> {
    const { isChange } = options;
    const media: MediaDocument = await this.mediaRepo.findById(id);
    if (!media) throw new BadRequestException('media doesn\'t exists');
    media.dislikes += 1;
    if (isChange) media.likes -= 1;
    await media.save();
  }

  async removeReaction(id: string, isLike: boolean): Promise<void> {
    const media: MediaDocument = await this.mediaRepo.findById(id);
    if (!media) throw new BadRequestException('media doesn\'t exists');
    if (isLike) media.likes -= 1;
    else media.dislikes -= 1;
    await media.save();
  }

  async incrementViews(id: string): Promise<void> {
    const media: MediaDocument = await this.mediaRepo.findById(id);
    if (!media) throw new BadRequestException('media doesn\'t exists');
    media.views += 1;
    media.save();
  }
}
