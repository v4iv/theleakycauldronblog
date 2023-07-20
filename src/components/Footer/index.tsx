import * as React from 'react'
import {Github, Rss, Twitter} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {TypographyMuted} from '@/components/ui/typography'

function Footer() {
  return (
    <footer className="mx-auto w-full max-w-screen-md">
      <div className="py-5 px-3 md:px-0 md:text-left text-center flex items-center flex-col md:flex-row">
        <div className="flex-grow">
          <TypographyMuted>
            Copyright &copy; 2018-{new Date().getFullYear().toString()} The
            Leaky Cauldron Blog. All Rights Reserved.
          </TypographyMuted>
        </div>

        <div className="flex mt-3 md:mt-0 space-x-2">
          <Button variant="outline" size="icon" aria-label="github" asChild>
            <a
              target="_blank"
              rel="noreferrer nofollow noopener"
              href="https://github.com/v4iv"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          <Button variant="outline" size="icon" aria-label="twitter" asChild>
            <a
              target="_blank"
              rel="noreferrer nofollow noopener"
              href="https://twitter.com/waybove"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>

          <Button variant="outline" size="icon" aria-label="rss-feed" asChild>
            <a href="https://theleakycauldronblog.com/rss.xml">
              <Rss className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
