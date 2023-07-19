import * as React from 'react'
import {Github, Rss, Twitter} from 'lucide-react'
import {Separator} from '@/components/ui/separator'
import {TypographyMuted} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'

function Footer() {
  return (
    <footer className="mx-auto w-full max-w-screen-md">
      <Separator />

      <div className="py-10 px-3 md:px-0 md:text-left text-center flex items-center flex-col md:flex-row">
        <div className="flex-grow">
          <TypographyMuted>
            Copyright &copy; 2018-{new Date().getFullYear().toString()} The
            Leaky Cauldron Blog. All Rights Reserved.
          </TypographyMuted>
        </div>

        <div className="flex mt-3 md:mt-0">
          <Button
            variant="outline"
            size="icon"
            aria-label="github"
            className="mr-2"
            asChild
          >
            <a
              target="_blank"
              rel="noreferrer nofollow noopener"
              href="https://github.com/v4iv"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="twitter"
            className="mr-2"
            asChild
          >
            <a
              target="_blank"
              rel="noreferrer nofollow noopener"
              href="https://twitter.com/waybove"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>

          <Button variant="outline" size="icon" aria-label="rss-feed" asChild>
            <a href="feed:https://theleakycauldronblog.com/rss.xml">
              <Rss className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
