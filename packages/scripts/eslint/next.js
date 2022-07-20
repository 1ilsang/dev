module.exports = {
  extends: ["next", "prettier"],
  env: {
    browser: true,
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal", // https://github.com/benmosher/eslint-plugin-import/issues/807
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
};
