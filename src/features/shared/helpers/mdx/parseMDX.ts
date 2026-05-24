import fs from 'fs';
import path from 'path';
import type { MDXContent } from 'mdx/types';
import type { Category, FileCategory, PostType } from '~/posts/models';
import { mdxMap } from './mdxMap';

const POST_PATH = path.join(process.cwd(), '_posts');
const WORDS_PER_MINUTE = 200;

const getReadingTime = (filePath: string): number => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const textOnly = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/[#*`[\]()!<>{}|]/g, '');
  const wordCount = textOnly.trim().split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};

const parseCategory = (category: FileCategory): Category => {
  switch (category) {
    case 'js':
      return 'JavaScript';
    case 'retrospect':
      return 'Retrospect';
    case 'rust':
      return 'Rust';
    case 'activity':
      return 'Activity';
    case 'tool':
      return 'Tool';
    case 'book':
      return 'Book';
    case 'algorithm':
      return 'Algorithm';
  }
};

export const parseMDX = async (fullSlug: string): Promise<PostType> => {
  const category = parseCategory(fullSlug.split('/').shift() as FileCategory);
  const slug = fullSlug.split('/').pop();
  const url = `/posts/${slug}`;
  const {
    frontmatter,
    default: MDX,
    toc,
  } = mdxMap[fullSlug] as PostType & {
    default: MDXContent;
  };

  const filePath = path.join(POST_PATH, fullSlug, 'docs.mdx');
  const readingTime = getReadingTime(filePath);

  return {
    frontmatter: {
      ...frontmatter,
      coverImage: `${url}/${frontmatter.coverImage}`,
    },
    toc,
    url,
    slug,
    fullSlug,
    category,
    MDX,
    readingTime,
  };
};
