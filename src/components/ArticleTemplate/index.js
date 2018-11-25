import React from "react";
import Content from "../Content";
import { Link } from "gatsby";
import _ from "lodash";

const ArticleTemplate = ({
                           content,
                           date,
                           contentComponent,
                           cover,
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
      {tags && tags.length ? (
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
        </p>) : null}
      <img src={cover} alt={title} className="image is-full" style={{ width: "100%" }}/>
      <section className="section">
        <PostContent content={content}/>
      </section>
    </article>
  );
};

// ArticleTemplate.propTypes = {
//   content: PropTypes.object,
//   date: PropTypes.string,
//   contentComponent: PropTypes.func,
//   cover: PropTypes.string,
//   tags: PropTypes.object,
//   title: PropTypes.string
// };

export default ArticleTemplate;