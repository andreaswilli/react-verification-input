module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest", "react"],
  rules: {
    "jest/no-conditional-expect": "error",
    "jest/no-disabled-tests": "error",
    "jest/no-done-callback": "error",
    "jest/no-duplicate-hooks": "error",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-todo": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
