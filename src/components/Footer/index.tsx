import React from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {Github, Rss, Twitter} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {TypographyMuted} from '@/components/ui/typography'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'

function Footer() {
  const {t} = useTranslation('common')

  return (
    <footer className="mx-auto w-full max-w-screen-md">
      <div className="flex flex-col items-center px-3 py-5 text-center md:flex-row md:px-0 md:text-left">
        <div className="grow">
          <TypographyMuted>
            {t('footer.copyright', {
              year: new Date().getFullYear().toString(),
            })}
          </TypographyMuted>
        </div>

        <div className="mt-3 flex space-x-2 md:mt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t('footer.github')}
                asChild
              >
                <a
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  href="https://github.com/v4iv"
                >
                  <Github className="size-4" />
                </a>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{t('footer.github')}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t('footer.twitter')}
                asChild
              >
                <a
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  href="https://twitter.com/waybove"
                >
                  <Twitter className="size-4" />
                </a>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{t('footer.twitter')}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t('footer.rss')}
                asChild
              >
                <a target="_blank" href="/rss.xml" rel="noopener noreferrer">
                  <Rss className="size-4" />
                </a>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{t('footer.rss')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  )
}

export default Footer
