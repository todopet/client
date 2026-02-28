module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "prettier", // prettier와 충돌 방지
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // 필요시 규칙 추가
    "react/react-in-jsx-scope": "off", // React 17+ 에서는 필요 없음
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "no-useless-catch": "off",
    "import/no-default-export": "warn",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-alert": "error",
    "no-debugger": "error",
  },
  overrides: [
    {
      files: ["src/App.tsx", "src/pages/**/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
