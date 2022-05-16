export interface IMedia {
  _id: string;
  title: string;
  search: string[];
  description: string;
  cast: string[];
  views: number;
  likes: number;
  dislikes: number;
  release: number;
  uploaded: number;
  expires: number;
  tags: string[];
  mediaType: string;
}
