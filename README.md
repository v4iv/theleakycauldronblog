[![Netlify Status](https://api.netlify.com/api/v1/badges/a3b02aa4-93ac-47d9-b914-7eb42de75a83/deploy-status)](https://app.netlify.com/sites/theleakycauldronblog/deploys)

<p align="center">
  <a href="https://theleakycauldronblog.com">
    <img alt="Gatsby" src="https://theleakycauldronblog.com/icon-512.png" width="60" />
  </a>
</p>
<h1 align="center">
  The Leaky Cauldron Blog
</h1>

## ✨ Features

- TypeScript

- Lunr search

- Pagination

- SEO friendly (Head API, Slug, Sitemap, Robots.txt etc)

- Google Analytics & Disqus Comments with [Cloudflare Zaraz](https://www.cloudflare.com/application-services/products/zaraz/)

- Built with shadcn/ui (Tailwind CSS)

- Decap CMS(Netlify CMS) generated markdown pages with Prism code highlighting, social embedding etc

- Netlify Forms

- Dark Mode

## 🚀 Getting Started

1. **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the blog starter.

    ```shell
    # create a new Gatsby project
    gatsby new {your-project-name} https://github.com/v4iv/theleakycauldronblog.git 
    ```

2. **Start developing.**

    Navigate to new site’s directory and start it up.

    ```shell
    cd {your-project-name}/
    yarn develop
    ```
    ### VS Code

    Set up debugging in VS Code by adding the following to `launch.json`

    ```json
    {
        "name": "Gatsby Develop",
        "type": "node",
        "request": "launch",
        "program": "${workspaceRoot}/node_modules/.bin/gatsby",
        "args": [
            "develop"
        ],
        "env": {
            "PARCEL_WORKERS": "0",
            "GATSBY_CPU_COUNT": "2",
        },
        "runtimeArgs": [
            "--nolazy"
        ],
        "console": "integratedTerminal"
    },
    ```

3. **Open the code and start editing!**

    Your site is now running at <http://localhost:8000>!

    Edit `src/pages` to see your site update in real-time!

4. **Customize**

    You'll need to change the following files to make it fully yours, also make sure to not deploy the site with the blog posts written for [theleakycauldronblog.com](https://theleakycauldronblog.com):

    - `gatsby-config.ts` : edit siteMetadata variable

    - `locales/en/common.json` : react-i18next is being used to manage entire site's branding, though you can extend it to support multiple languages as well

    - `static/admin/config.yml` : site url, default values

    - `src/assets/avatar.png` : your brand icons

    - `static/icon-*.png` : your brand icons

    - `static/apple-touch-icon.png` : your brand icons

    - `static/favicon.ico` : your brand icons

    - `static/robots.txt` : sitemap url

4. **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## Built with Netlify

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg"/>
</a>
