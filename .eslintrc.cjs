module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    "react": {
      "version": "detect"
    }
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off"
  },
};
