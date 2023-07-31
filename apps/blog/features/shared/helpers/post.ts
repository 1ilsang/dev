/**
 * Inspired by blog-starter-typescript-app
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter-typescript/README.md
 */
import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

const rootPostPath = join(process.cwd(), "_posts");

export const getPostSlugs = (
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
      const _posts = "_posts/";
      mergedFiles.push(
        curPath.substring(curPath.indexOf(_posts)).replace(_posts, ""),
      );
    }
  });
  return mergedFiles;
};

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(rootPostPath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
};

export const getAllPosts = (fields: string[] = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, [...fields, "date"]))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
