import path from 'path';
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { fileURLToPath } from 'url';
import { withMDX } from './scripts/mdx.confg.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type { function(string, any): import('next').NextConfig } */
const getNextConfig = (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    experimental: {
      // this includes files from the monorepo base two directories up
      // outputFileTracingRoot: path.join(__dirname, "../../packages/content/posts"__dirname),
    },
    images: {
      loader: 'akamai',
      path: '/',
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    pageExtensions: ['tsx', 'mdx'],
  };

  if (phase === PHASE_PRODUCTION_BUILD) {
    nextConfig.output = 'export';
  }

  return nextConfig;
};

/** @type { function(string, any): Promise<any> } */
export default (phase) => withMDX(getNextConfig(phase));
