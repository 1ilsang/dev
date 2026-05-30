import fs from 'fs';
import path from 'path';
import readline from 'readline';

const { process } = globalThis;
const POST_PATH = path.join(process.cwd(), '_posts');
const CSPELL_POSTS_CONFIG = path.join(process.cwd(), 'cspell.posts.json');

const CSPELL_TEMPLATE = `{
  "overrides": [
    {
      "filename": "docs.mdx",
      "words": []
    }
  ]
}
`;

const registerPostCspell = (postDir: string) => {
  const importPath = `./${path.relative(process.cwd(), postDir).replace(/\\/g, '/')}/cspell.json`;

  fs.writeFileSync(path.join(postDir, 'cspell.json'), CSPELL_TEMPLATE);

  const config = JSON.parse(fs.readFileSync(CSPELL_POSTS_CONFIG, 'utf8')) as {
    import: string[];
  };
  if (!config.import.includes(importPath)) {
    config.import.push(importPath);
    config.import.sort();
    fs.writeFileSync(
      CSPELL_POSTS_CONFIG,
      `${JSON.stringify(config, null, 2)}\n`,
    );
  }
};

const categoryMap: Record<string, string> = {
  js: 'js',
  activity: 'activity',
  book: 'book',
  retrospect: `retrospect/${new Date().getFullYear()}`,
  rust: 'rust',
  tool: 'tool',
  algorithm: 'algorithm',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve));

const main = async () => {
  const categories = Object.keys(categoryMap);
  console.info(`\n카테고리: ${categories.join(', ')}`);
  const category = await ask('카테고리: ');
  if (!categoryMap[category]) {
    console.error(`❌ 잘못된 카테고리: ${category}`);
    process.exit(1);
  }

  const slug = await ask('URL 슬러그(kebab-case, /posts/SLUG 형태가 됨): ');
  if (!slug) {
    console.error('❌ 슬러그를 입력해주세요');
    process.exit(1);
  }

  const title = await ask('제목: ');
  const description = await ask('설명: ');
  const tagsInput = await ask('태그 (쉼표 구분): ');
  rl.close();

  const tags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const tagsStr =
    tags.length > 0 ? tags.map((t) => `'${t}'`).join(', ') : `'${category}'`;

  const postDir = path.join(POST_PATH, categoryMap[category], slug);
  if (fs.existsSync(postDir)) {
    console.error(`❌ 이미 존재합니다: ${postDir}`);
    process.exit(1);
  }

  fs.mkdirSync(postDir, { recursive: true });

  const date = new Date().toISOString();
  const content = `---
title: '${title}'
description: '${description}'
tags: [${tagsStr}]
coverImage: 'cover.webp'
date: '${date}'
---

![cover](cover.webp 'cover')

${description}

## 목차

- [시작하며](#시작하며)
- [마치며](#마치며)

## 시작하며

## 마치며
`;

  fs.writeFileSync(path.join(postDir, 'docs.mdx'), content);
  registerPostCspell(postDir);
  console.info(`\n\x1b[36m ✓ Created: ${postDir}/docs.mdx\x1b[0m`);
  console.info(`\x1b[36m ✓ Created: ${postDir}/cspell.json\x1b[0m`);
  console.info(`\x1b[33m ⚠ Add cover.webp to: ${postDir}/\x1b[0m`);
  console.info(
    `\x1b[33m ⚠ cspell 오탐 단어는 ${postDir}/cspell.json 의 words 에 추가하세요\x1b[0m\n`,
  );
};

await main();
