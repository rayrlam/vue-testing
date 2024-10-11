// const { rules } = require("@typescript-eslint/eslint-plugin");

import { rules } from "@typescript-eslint/eslint-plugin";

// const { root } = require("postcss");

import { root } from "postcss";

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vitest-globals/env': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript',
        'prettier',
        'plugin:vitest/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
    },
    plugins: ['@typescript-eslint', 'vue', 'vitest'],
    rules: {
        'vue/multi-word-component-names': 'warn',
        // Add any other custom rules here
    },
    overrides: [
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
}