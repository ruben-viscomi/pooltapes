import { IMedia } from './media.interface';
import { ISeason } from './season.interface';

export interface ISeries extends IMedia {

  seasons: ISeason[];

}
