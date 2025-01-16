import type { MDXContent } from 'mdx/types';
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

interface PostMetadata {
  title: string;
  description: string;
  tags: string[];
  coverImage: string;
  /** CreatedAt */
  date: string;
  updatedAt?: string;
}
export enum TOC_DEPTH {
  H2 = 2,
  H3 = 3,
}
export interface TOC {
  depth: TOC_DEPTH;
  value: string;
  id: string;
}

export type PostType = {
  MDX: MDXContent;
  /** TOC */
  toc: TOC[];
  /** MDX 문서 메타데이터 */
  frontmatter: PostMetadata;
  /** Post URL (ex: /posts/2024-woowa-ignite) */
  url: string;
  /** Post Slug (ex: 2024-woowa-ignite) */
  slug: string;
  /** Post Full Slug (ex: activity/2024-woowa-ignite) */
  fullSlug: string;
  /** 파일이 속한 카테고리 (ex: activity) */
  category: Category;
};
