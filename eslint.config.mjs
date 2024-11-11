// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { files: ["**/*.{js,mjs,cjs,ts}"] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jestPlugin from "eslint-plugin-jest";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "*src/config/config.js", // Any specific files you want to ignore
      "*src/database.ts",
      "*src/migrations/*",
      "*src/seeders/*",
      "*src/models/index.js",
    ],
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      // globals: globals.browser,
      globals: {
        ...globals.node, // Enables Node.js globals like `process`
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...jsPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      // Add or override any specific rules here
    },
  },
  {
    // Jest-specific configuration for test files
    files: ["**/__tests__/*.{js,ts}", "**/*.{spec,test}.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.jest, // Enables Jest globals like `describe`, `test`, etc.
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
];
