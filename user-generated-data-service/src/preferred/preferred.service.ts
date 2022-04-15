import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Preferred, PreferredDocument } from './preferred.model';

import { PreferredDto } from './dto/preferred.dto';

@Injectable()
export class PreferredService {

  constructor(@InjectModel(Preferred.name) private readonly preferredModel: Model<PreferredDocument>) {}

  async createPreferred(userId: string, preferred: PreferredDto): Promise<void> {
    // TODO: implement
    console.log('This action adds a new preferred');
  }

  async getAllPreferred(userId: string, movie?:boolean): Promise<any> {
    // TODO: implement
    return `This action returns all preferred`;
  }

  async getPreferred(userId: string, id: string): Promise<any> {
    // TODO: implement
    return `This action returns a #${id} preferred`;
  }

  async deletePreferred(userId: string, id: string): Promise<void> {
    // TODO: implement
    console.log(`This action removes a #${id} preferred`);
  }

}
