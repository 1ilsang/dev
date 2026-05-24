import fs from 'fs';
import path from 'path';

const POST_PATH = path.join(process.cwd(), '_posts');

export const slugList = [
  ...new Set(
    fs
      .readdirSync(POST_PATH, {
        withFileTypes: true,
        recursive: true,
      })
      .filter((post) => post.isFile() && post.name.endsWith('.mdx'))
      .map((post) => post.parentPath.split('/').pop()),
  ),
];
