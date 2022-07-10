/**
 * Inspired by blog-starter-typescript-app
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter-typescript/README.md
 */
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postPath = join(process.cwd(), "_posts");

export const getPostSlugs = () => {
  return fs.readdirSync(postPath);
};

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postPath, `${realSlug}.md`);
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
