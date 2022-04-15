import { Injectable } from '@nestjs/common';
import { PreferredDto } from './dto/preferred.dto';

@Injectable()
export class PreferredService {

  async createPreferred(userId: string, preferred: PreferredDto): Promise<void> {
    console.log('This action adds a new preferred');
  }

  async getAllPreferred(userId: string, movie?:boolean): Promise<any> {
    return `This action returns all preferred`;
  }

  async getPreferred(userId: string, id: string): Promise<any> {
    return `This action returns a #${id} preferred`;
  }

  async deletePreferred(userId: string, id: string): Promise<void> {
    console.log(`This action removes a #${id} preferred`);
  }

}
