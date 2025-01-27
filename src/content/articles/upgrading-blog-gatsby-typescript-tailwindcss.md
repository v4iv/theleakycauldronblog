---
title: Upgrading My Blog to Gatsby v5 with TypeScript and Tailwind CSS
description: Discover the journey of upgrading my blog to Gatsby v5 with
  TypeScript. Enhanced performance, new features, and improved design await!
pubDate: 2023-08-01T12:30:00.000Z
slug: upgrading-blog-gatsby-typescript-tailwindcss
author: vaibhav-sharma
cover: src/assets/media/andrew-neel-upgrading-blog-gatsby-typescript-tailwindcss.jpg
tags:
  - typescript
  - gatsby js
  - react js
---
When I first started this blog, I was among the early adopters of [Gatsby JS](https://www.gatsbyjs.com/docs), a static site generator that allowed me to create blazing-fast websites with React and GraphQL. However, in those early days, Gatsby was still evolving, and the plugin ecosystem was not as mature and stable as it is today. As each new release brought improvements, it also brought its fair share of challenges. Nonetheless, I persevered, learning from issues that arose and helping others in the process.

By the time I released version 2 of my website using Gatsby 3, the platform had significantly matured, and it offered more stability and features. However, one crucial aspect was missing - TypeScript support. It was time to address this limitation and make my codebase more robust.

## The Journey Begins: Moving to TypeScript and Tailwind CSS

I decided to embark on a journey to upgrade my blog to Gatsby v5 and integrate TypeScript support. But before that, I needed to address some design aspects of the blog. My existing CSS toolkit, Tachyons, served me well, but it seemed to have been abandoned. Tailwind CSS, which had gained tremendous popularity, offered similar benefits without complex setup requirements.

To eliminate bloat and unnecessary dependencies, I decided to rewrite my codebase from scratch, retaining only the Markdown pages from the previous version. I started by generating a new Gatsby project with TypeScript, Tailwind CSS, and Netlify CMS. This fresh foundation would set the stage for a cleaner and more efficient blog.

## Revamping Styling with `shadcn/ui`

To maintain consistency in styling and ensure future extensibility, I sought out a suitable component system. After exploring various options, I settled on [`shadcn/ui`](https://ui.shadcn.com), a flexible framework that generates component files, allowing for infinite customization possibilities. This choice provided the perfect balance of convenience and control, saving me the trouble of designing a new component system from scratch.

## Improving User Experience: Pagination and Search Functionality

Before diving into styling, I prioritized implementing pagination. The plugin I previously used for this feature, `gatsby-paginate`, had been abandoned. Instead of relying on outdated code, I decided to write my pagination functionality from scratch, providing a tailored solution that better suited my needs.

Moreover, the search functionality on my blog required enhancement. With the previous `@gatsby-contrib/gatsby-plugin-elasticlunr-search` plugin now abandoned, I integrated `Lunr` search using `gatsby-plugin-local-search`, a powerful JavaScript-based search engine. This upgrade improved the search experience for my readers and ensured they could easily find the content they were looking for.

## Removing Excess Features and Embracing New Ones

As part of this migration process, I reevaluated the features present on my blog. I decided to remove certain elements that were either outdated or posed more problems than benefits. Among the features I discarded were:

* **Site-wide branding with `config.js`:** To maintain branding consistency across the site i was using a config.js file but removed that in favor of `react-i18next` as it was a dual purpose solution.
* **Embedding support for various services:** I streamlined the embedded content to avoid clutter and improve loading times.
* **Offline support:** While it sounded good on paper, I found that offline support created more issues than it resolved, so I decided to drop it.
* **Cookie consent:** The previous cookie consent implementation was unreliable, so I removed it in favor of a better user experience.
* **Web Vitals tracking:** Cloudflare's Real User Monitoring (RUM) already handled this aspect efficiently.
* **Google Tag Manager (GTM):** I wanted to implement it using `partytown` support that Gatsby Script API provides, so I experimented with off-main-thread strategies for GTM integration, but turns out the redirects didn't work on netlify, so removed it in favor of *Cloudflare Zaraz*.
* **Newsletter form:** Simplified my approach by removing the newsletter form, reducing maintenance overhead.

## Introducing New Features and Enhancements

Amidst the removal of unnecessary features, I also introduced some exciting new additions to my blog:

* **Site-wide branding using `react-i18next`:** This allowed me to make a base to provide multilingual support in future while still acting as a one stop config hub.
* **Automatic Dark mode:** Catering to the growing trend and preferences for dark mode, I incorporated this feature to give users more control over their reading experience.
* **Cloudflare *Zaraz*:** By integrating *[Zaraz](https://www.cloudflare.com/application-services/products/zaraz/)*, I gained more granular control over tracking and analytics on my blog, without blocking main thread.
* **Contact form using `react-hook-form` and validation with `zod`:** To ensure a smoother experience for users interacting with the contact form, I migrated from `Formik` to `react-hook-form`, and for validation, I switched from `yup` to `zod`.
* **Licensing changes:** I made licensing more explicit, separating licenses for posts, the code within them, and the Gatsby website. Thanks [@dan_abramov](https://twitter.com/dan_abramov)
* **Typescript and GraphQL type generation:** Adding TypeScript support allowed for better code maintenance and provided improved type safety. Additionally, GraphQL type generation further enhanced the development workflow.

## Optimization and Bloat Removal

One of the primary goals of this migration was to optimize performance and eliminate bloat. I meticulously reviewed each part of the website, optimizing queries, removing unused packages, and employing best practices to enhance loading times and overall user experience.

## Conclusion

The journey of moving my blog to Gatsby v5 with TypeScript was both challenging and rewarding. By adopting the latest features and shedding unnecessary baggage, I was able to create a more efficient, better-performing, and future-proof blog. Embracing TypeScript and enhancing the design with Tailwind CSS streamlined the development process, making it more enjoyable and maintainable.

As the web continues to evolve, so will my blog. I look forward to exploring new technologies, optimizing performance, and delivering valuable content to my readers while staying true to the core principles of simplicity and efficiency. So, welcome to the new and improved blog - fast, functional, and ready to engage!
