module.exports = {
  experimental: {
    // this includes files from the monorepo base two directories up
    // outputFileTracingRoot: path.join(__dirname, "../../packages/content/posts"),
  },
  images: {
    loader: "imgix",
    path: "https://1ilsang.dev/",
    domains: ["avatars.githubusercontent.com"],
  },
};
