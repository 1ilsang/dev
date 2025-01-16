import fs from 'fs';
import path from 'path';

const { process, console } = globalThis;

const PUBLIC_PATH = path.join(process.cwd(), 'public/posts');
const POST_PATH = path.join(process.cwd(), '_posts');

const allowFiles = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.pdf',
  '.mov',
];

const postDirPaths = [
  ...new Set(
    fs
      .readdirSync(POST_PATH, {
        withFileTypes: true,
        recursive: true,
      })
      .filter((post) => post.isFile())
      // _posts 이후의 경로만 추출
      .map((post) => post.parentPath.slice(POST_PATH.length + 1)),
  ),
];

const assetsToPublic = async () => {
  for await (const postDirPath of postDirPaths) {
    const postUrl = postDirPath.split('/').pop();
    if (!postUrl) continue;
    const publicPostPath = path.resolve(PUBLIC_PATH, postUrl);
    const postDirFullPath = path.resolve(POST_PATH, postDirPath);

    const assetFiles = fs
      .readdirSync(postDirFullPath, {
        withFileTypes: true,
      })
      .filter((file) => allowFiles.includes(path.extname(file.name)))
      .map((file) => file.name);

    if (assetFiles.length === 0) continue;

    if (fs.existsSync(publicPostPath)) {
      fs.rmSync(publicPostPath, { recursive: true });
    }
    fs.mkdirSync(publicPostPath, { recursive: true });

    await Promise.all(
      assetFiles.map(async (file) => {
        const assetPath = path.resolve(postDirFullPath, file);
        const movePath = path.resolve(publicPostPath, file);
        await fs.promises.copyFile(assetPath, movePath);
      }),
    );
  }
};

const main = async () => {
  await assetsToPublic();
  console.info('\n\x1b[36m ✓ Assets moved to public\x1b[0m\n');
};

await main();
