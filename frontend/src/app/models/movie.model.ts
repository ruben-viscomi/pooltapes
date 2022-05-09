import { IVideo } from './video.model';
import { IActor } from './actor.model';

export interface IMovie {
  _id: string;
  title: string;
  search: string[];
  video: IVideo;
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
