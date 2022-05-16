import { IMedia } from './media.interface';
import { IVideo } from './video.interface';


export interface IMovie extends IMedia {

  video: IVideo;

}
