import { Gender } from './gender.enum';

export interface IActor {
  
  _id: string;
  name: string;
  search: string[];
  nationality: string;
  birthdate: number;
  gender: Gender;

}
