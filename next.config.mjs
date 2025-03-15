import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { withMDX } from './scripts/mdx.confg.mjs';

/** @type { function(string, any): import('next').NextConfig } */
const getNextConfig = (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'mdx'],
  };

  if (phase === PHASE_PRODUCTION_BUILD) {
    nextConfig.output = 'export';
  }

  return nextConfig;
};

/** @type { function(string, any): Promise<any> } */
export default (phase) => withMDX(getNextConfig(phase));
