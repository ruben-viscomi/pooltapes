import { ISeason } from './season.model';
import { IActor } from './actor.model';

export interface ISeries {
  _id: string;
  title: string;
  search: string[];
  seasons: ISeason[];
  description: string;
  cast: string[] | IActor[];
  views: number;
  likes: number;
  dislikes: number;
  release: number;
  uploaded: number;
  expires: number;
  tags: string[];
}
