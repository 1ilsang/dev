import fs from 'fs';
import path from 'path';
import { parseMDX } from './parseMDX';

const POST_PATH = path.join(process.cwd(), '_posts');

const getAllFullSlug = () => {
  const ret = [
    ...new Set(
      fs
        .readdirSync(POST_PATH, {
          withFileTypes: true,
          recursive: true,
        })
        .filter((post) => post.isFile())
        // _posts 이후의 경로만 추출. ex) _posts/js/object-type/docs.md -> js/object-type
        .map((post) => post.parentPath.slice(POST_PATH.length + 1)),
    ),
  ];
  return ret;
};

export const getPostBySlug = async (slug: string) => {
  const allFullSlug = getAllFullSlug();
  const fullSlug = allFullSlug.find((fullSlug) => {
    const pathSegments = fullSlug.split('/');
    return pathSegments[pathSegments.length - 1] === slug;
  });
  return await parseMDX(fullSlug);
};

const getPostByFullSlug = async (fullSlug: string) => {
  return await parseMDX(fullSlug);
};

export const getAllPost = async () => {
  const allFullSlug = getAllFullSlug();
  const allPost = (await Promise.all(allFullSlug.map(getPostByFullSlug))).sort(
    (post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1,
  );

  return allPost;
};

export const getAllTag = async () => {
  const allPost = await getAllPost();
  const tags = allPost.map((post) => post.frontmatter.tags).flat();
  return [...new Set(tags)];
};
