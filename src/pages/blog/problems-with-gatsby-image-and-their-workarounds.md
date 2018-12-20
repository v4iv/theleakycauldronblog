---
templateKey: article-page
title: Problems with Gatsby Image and their workarounds
date: 2018-12-19T19:29:55.624Z
cover: /img/gatsby-image-workarounds.jpeg
tags:
  - GatsbyJS
meta_title: Problems with Gatsby Image and their workarounds
meta_description: >-
  Gatsby Image is a very powerful package with drool worthy features. It makes
  it very easy to implement, Medium like progressive image loading among other
  things. But it has its fair share of problems. Here are some of them along
  with workarounds.
---
Gatsby Image is a very powerful package with drool worthy features. It makes it very easy to implement, Medium like progressive image loading. It can do a bunch of other stuff but that's the fancy stuff. But I decided to not use it for this website, mostly because it doesn't play well with Netlify CMS. And, I was quite happy with the site's performance as it doesn't have many images.

The article list is all words no thumbnails and since all the images are within article, it's works out fine. This all changed when I decided to ditch Bulma for Tachyons.

> "With New Framework Comes New Design"
>
> \- Anonymous

In the new design I was working the article list had a small thumbnails along with the title and excerpt. 

![](/img/screenshot-2018-12-19-at-11.19.21-pm.png)

Without the optimisation magic of Gatsby Image each page size would be touching 5MB. Begrudgingly, I decided to use Gatsby Image. I did what anyone would do, installed the package and peer dependencies. And as instructed added the relevant config. That's when problem began! Everything started breaking. And I'm ashamed that it took me lot more time than I'm willing to admit, to solve them. Well everyone has bad days.

# Things to be careful about while configuring Gatsby Image

First, you need '**gatsby-remark-relative-images**'to convert image src(s) in markdown to be relative to their node's parent directory. So that '**gatsby-remark-images**' can match images outside the node folder. This is especially important if you are working with Netlify CMS. Also, don't forget to add fmImagesToRelative to _gatsby-node.js_.

```javascript
const {fmImagesToRelative} = require('gatsby-remark-relative-images')

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions
  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

Second, The '**gatsby-source-filesystem**' media folder must be included before the other plugins, especially Netlfiy CMS. That's something that has been mentinoned in **gatsby-transformer-remark**'s README.md. Not only that, it'll be best if you include '**gatsby-transformer-sharp**' '**gatsby-plugin-sharp'** and '**gatsby-transformer-remark**' before any other plugin in _gatsby-config.js_. Not doing this will definitely lead to '**Field "image" must not have a selection since type "String" has no subfields**' error.

Third, once you are done configuring you cannot just query an image without parameters. I suggest **publicURL**.

Fourth, GIFs and SVGs are not processed by Gatsby Image. So always include **publicURL** in the parameters as an alternate.

```javascript
export const imageQuery = graphql`
       image {
            childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                    ...GatsbyImageSharpFluid
                }
            }
            publicURL
        }`
```

```javascript
        {!!image && !!image.childImageSharp
          ? <Img fluid={image.childImageSharp.fluid}
                 alt={title}
            />
          : <img src={image.publicURL}
                 alt={title} 
           />
        }

```

Finally, sometimes the build can fail just because **node_modules/** needs to be rebuilt. So, if you see nothing else working try removing **node_modules/** and reinstalling packages.

# Gatsby Image and Gatsby Paginate don't go well together

While implementing Article List I ran into an error that disturbed me for hours. Let me preface by explaining how Gatsby Paginate works. We plugin Gatsby Paginate's `createPaginatedPages` function in _gatsby-node.js_. It takes the `createPages` method and takes results of the query to create paginated list of posts.

```javascript
return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields {
              slug
            }
            frontmatter {
              title
              tags
              date(formatString: "MMMM DD, YYYY")
              templateKey
            }
          }
        }
      }
    }
  `)
```

So, if I had to display a thumbnail on my article list I just add that query. Simple enough right? Wrong! You add image to the query, and you run into the first problem, it needs to have parameters. That's okay, you need to apply `...GatsbyImageSharpFluid` anyways, but wait! This throws an error, one that drove me crazy and made me write this article.

```javascript
return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields {
              slug
            }
            frontmatter {
              image
              title
              tags
              date(formatString: "MMMM DD, YYYY")
              templateKey
            }
          }
        }
      }
    }
  `)
```

```shell
Error: unknown fragment ...GatsbyImageSharpFluid
```

This is an annoying problem because the reason it states is very confusing! Clearly, **GatsbyImageSharpFluid** is a fragment and I know that for sure. After searching for hours I find out an interesting thing.

The query in _gatsby-node.js_ is only the path and stuff you put in context, which you can use in your page/template to retrieve the data you need. What this means is it's only creating pages, the query there isn't really supposed to be passing data down besides a kind of reference which you can use in the page to make a query for the specific kind of data that page needs. Hence, it doesn't recognise **GatsbyImageSharpFluid** as a valid fragment.

Which brings us to workaround. After looking online I found that I'm not the only one to run into this Catch 22. Various people found various work arounds, with varying results. After failing to get any of them working for me, it struck me. A workaround that'll work for everyone, not ideal but universal. All you gotta do is pass the required fields of fluid to it manually. And to add the base64 placeholder image, top it off with **base64**.

```javascript
return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields {
              slug
            }
            frontmatter {
              image {
                childImageSharp{
                  fluid (maxWidth:500, quality:50){
                    src
                    srcSet
                    aspectRatio
                    sizes
                    base64
                  }
                }
                publicURL
              }
              title
              tags
              date(formatString: "MMMM DD, YYYY")
              templateKey
            }
          }
        }
      }
    }
  `)
```

Ooooorrrrr, you could simply use one of the other plugins for pagination.

Neither Gatsby Image nor Gatsby Paginate are ideal packages. But the utility they provide is without question, very helpful. As the Gatsby community grows, we'll have perfect solutions. But till then I just hope we keep sharing the problems we run into and how we overcome them.
