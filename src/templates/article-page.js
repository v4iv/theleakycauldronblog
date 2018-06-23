/**
 * Created by vaibhav on 9/4/18
 */
import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import _ from "lodash";
import Link from "gatsby-link";
import Content, { HTMLContent } from "../components/Content";
import SE0 from "../components/SEO";
import Disqus from "../components/Disqus";
import Share from "../components/Share";

export const ArticleTemplate = ({
                                  content,
                                  date,
                                  contentComponent,
                                  cover,
                                  meta_title,
                                  meta_desc,
                                  tags,
                                  title
                                }) => {
  const PostContent = contentComponent || Content;

  return (
    <article className="article content">
      <header className="article-header">
        <small>
          <span className="has-text-primary">{date}&nbsp;</span>
        </small>
        <h1 className="is-size-2">{title}</h1>
      </header>
      <p className="tags">
        {tags.map(tag => (
          <Link
            to={`/tags/${_.kebabCase(tag)}`}
            key={tag}
            className="has-text-black is-italic"
          >
            <small>#{tag}&nbsp;</small>
          </Link>
        ))}
      </p>
      <img src={cover} alt={title} className="image is-full" style={{ width: "100%" }}/>
      <section className="section">
        <PostContent content={content}/>
      </section>
    </article>
  );
};

ArticleTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string,
  contentComponent: PropTypes.func,
  cover: PropTypes.string,
  meta_title: PropTypes.string,
  meta_desc: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
};

const ArticlePage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <section className="section">
      <SE0
        title={post.frontmatter.title}
        meta_title={post.frontmatter.meta_title}
        meta_desc={post.frontmatter.meta_description}
        cover={post.frontmatter.cover}
        slug={post.fields.slug}
        date={post.frontmatter.date}
      />
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <ArticleTemplate
              content={post.html}
              contentComponent={HTMLContent}
              date={post.frontmatter.date}
              cover={post.frontmatter.cover}
              meta_title={post.frontmatter.meta_title}
              meta_desc={post.frontmatter.meta_description}
              tags={post.frontmatter.tags}
              title={post.frontmatter.title}
            />
            <Share title={post.frontmatter.title} slug={post.fields.slug} excerpt={post.frontmatter.meta_description}/>
            <Disqus title={post.frontmatter.title} slug={post.fields.slug}/>
          </div>
        </div>
      </div>
    </section>
  );
};

ArticlePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default ArticlePage;

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        cover
        meta_title
        meta_description
        tags
      }
    }
  }
`;
