import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig({
  ignores: ['dist/**'], // ✅ top-level ignore

  overrides: [
    js.configs.recommended,
    tseslint.configs.recommended,

    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
      languageOptions: {
        globals: globals.browser,
      },
      plugins: {
        js,
        '@stylistic/js': stylisticJs,
      },
      rules: {
        '@stylistic/js/indent': ['error', 2],
        '@stylistic/js/linebreak-style': ['error', 'unix'],
        '@stylistic/js/quotes': ['error', 'single'],
        '@stylistic/js/semi': ['error', 'never'],
      },
    },

    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "commonjs",
      },
    },
  ]
})
