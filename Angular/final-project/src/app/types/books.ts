import { User } from './user';

export interface Book {
  _id: string; 
  title: string; 
  shortDescription: string; 
  longDescription: string; 
  image: string; 
  year: number; 
  author: string; 
  userId: User; 
  __v: number; 
}
