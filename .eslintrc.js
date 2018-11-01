module.exports = {
  env: {
    commonjs: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    parser: "typescript-eslint-parser"
  },

  plugins: ["vue", "prettier"],

  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  root: true,

  extends: [
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
    "plugin:vue/essential",
    "@vue/prettier",
    "@vue/typescript"
  ]
};
