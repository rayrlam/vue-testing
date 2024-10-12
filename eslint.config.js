import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      vue: eslintPluginVue,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...eslintPluginVue.configs.base.rules,
      ...eslintPluginVue.configs["vue3-essential"].rules,
      ...eslintPluginVue.configs["vue3-strongly-recommended"].rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "vue/script-setup-uses-vars": "error",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      'vue/comment-directive': 'off',
      "vue/component-api-style": ["error", ["script-setup", "composition"]],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
    },
  },
];
