import { User } from './user';

export interface Book {
  _id: string; 
  title: string; 
  short_description: string; 
  long_description: string;  
  image: string; 
  year: number; 
  author: string; 
  userId: User; 
  __v: number; 
}
