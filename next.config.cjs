// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // this includes files from the monorepo base two directories up
    // outputFileTracingRoot: path.join(__dirname, "../../packages/content/posts"),
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
