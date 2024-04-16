/**
 * Inspired by blog-starter-typescript-app
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter-typescript/README.md
 */
import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { Category, FileCategory, PostType } from '~/posts/models';

const rootPostPath = join(process.cwd(), '_posts');

const getPostSlugs = (
  dirPath: string = rootPostPath,
  recursiveFiles: string[] = [],
) => {
  const files = fs.readdirSync(dirPath);

  let mergedFiles = recursiveFiles;

  files.forEach((file) => {
    const curPath = `${dirPath}/${file}`;
    if (fs.statSync(curPath).isDirectory()) {
      mergedFiles = getPostSlugs(curPath, mergedFiles);
    } else {
      const _posts = '_posts/';
      const subFullPath = curPath
        .substring(curPath.indexOf(_posts))
        .replace(_posts, '');
      mergedFiles.push(subFullPath);
    }
  });
  return mergedFiles;
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

export const getPostBySlug = (
  slug: PostType['slug'],
  fields: (keyof PostType)[] = [],
) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(rootPostPath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const originCategory = slug.slice(0, slug.indexOf('/')) as FileCategory;
  const category = parseCategory(originCategory);

  const items = {
    category,
  } as PostType;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
};

export const urlToSlugMap: Record<PostType['url'], PostType['slug']> = {};

export const getAllPosts = (fields: (keyof PostType)[] = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug, [...fields, 'url', 'date']);
      if (post.url && !urlToSlugMap[post.url]) {
        urlToSlugMap[post.url] = slug;
      }
      return post;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
