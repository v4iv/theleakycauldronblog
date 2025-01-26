import tailwind from "eslint-plugin-tailwindcss"
import eslintPluginAstro from "eslint-plugin-astro"

export default [
  ...tailwind.configs["flat/recommended"],
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error",
      "tailwindcss/no-custom-classname": "off",
    },
  },
]
