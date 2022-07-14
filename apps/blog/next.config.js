/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  experimental: {
    // this includes files from the monorepo base two directories up
    // outputFileTracingRoot: path.join(__dirname, "../../packages/content/posts"),
  },
  images: {
    loader: "akamai",
    path: "/",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
