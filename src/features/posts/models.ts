import type { CATEGORY_LIST } from './constants';

export type FileCategory =
  | 'activity'
  | 'algorithm'
  | 'book'
  | 'js'
  | 'retrospect'
  | 'rust'
  | 'tool';
export type Category = (typeof CATEGORY_LIST)[number];
export interface PostType {
  slug: string;
  url: string;
  title: string;
  date: string;
  updatedAt?: string;
  category: Category;
  tags: string[];
  coverImage: string;
  description: string;
  ogImage: {
    url: string;
  };
  content: string;
}
