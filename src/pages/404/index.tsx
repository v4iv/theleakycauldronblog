import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main>
      <section>
        <h2>404 | Page Not Found</h2>

        <p>Sorry, we can&apos;t find the page you are looking for.</p>
      </section>

      <section>
        <h5>Are you looking for one of these?</h5>

        <ul>
          <li>
            <Link to="/" replace>
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" replace>
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" replace>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/search" replace>
              Search
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404: Page Not Found</title>
