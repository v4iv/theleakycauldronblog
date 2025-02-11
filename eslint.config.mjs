import pluginReact from "eslint-plugin-react"
import tailwind from "eslint-plugin-tailwindcss"
import eslintPluginAstro from "eslint-plugin-astro"
import reactCompiler from "eslint-plugin-react-compiler"
import typescriptParser from "@typescript-eslint/parser"

export default [
  ...tailwind.configs["flat/recommended"],
  ...eslintPluginAstro.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{jsx,tsx}"],
    ignores: ["src/components/ui/*.tsx"],
    settings: { react: { version: "detect" } },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      parser: typescriptParser,
    },
  },
  reactCompiler.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error",
      "tailwindcss/no-custom-classname": "off",
    },
  },
]
