import { CATEGORY_LIST } from './constants';

export type FileCategory =
  | 'activity'
  | 'algorithm'
  | 'book'
  | 'etc'
  | 'js'
  | 'retrospect'
  | 'rust'
  | 'tool';
export type Category = (typeof CATEGORY_LIST)[number];
export interface PostType {
  slug: string;
  title: string;
  date: string;
  category: Category;
  tags: string[];
  coverImage: string;
  description: string;
  ogImage: {
    url: string;
  };
  content: string;
}
