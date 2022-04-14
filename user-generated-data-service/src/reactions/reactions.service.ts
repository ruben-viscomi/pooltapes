import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionsService {

  async like(userId: string): Promise<void> {
    // TODO: implement
    console.log(`like from user with id: ${userId}`);
  }

  async dislike(userId: string): Promise<void> {
    // TODO: implement
    console.log(`like from user with id: ${userId}`);
  }

  async getReactions(userId: string): Promise<any> {
    // TODO: implement
    return `reaction[] from user with id: ${userId}`;
  }

  async getReaction(userId: string, id: string): Promise<any> {
    // TODO: implement
    return `reaction with id: ${id} from user with id: ${userId}`;
  }

}
