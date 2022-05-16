import { IActor } from './actor.interface';

export interface IMedia {

  _id: string;
  title: string;
  search: string[];
  description: string;
  cast: string[] | IActor[];
  views: number;
  likes: number;
  dislikes: number;
  release: number;
  uploaded: number;
  expires: number;
  tags: string[];
  mediaType: string;
  
}
