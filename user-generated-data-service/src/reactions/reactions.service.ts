import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionsService {

  async like(): Promise<void> {
    // TODO: implement
    console.log('like');
  }

  async dislike(): Promise<void> {
    // TODO: implement
    console.log('dislike');
  }

  async getReactions(): Promise<any> {
    // TODO: implement
    return `reaction[]`;
  }

  async getReaction(id: string): Promise<any> {
    // TODO: implement
    return `reaction with id ${id}`;
  }

}
