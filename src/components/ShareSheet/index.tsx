import React from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {Link, Share} from 'lucide-react'
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import {Button} from '@/components/ui/button'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

interface ShareSheetProps {
  title: string
  slug: string
  siteURL: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  iconOnly?: boolean
  orientation?: 'horizontal' | 'vertical'
}

function ShareSheet({
  title,
  slug,
  siteURL,
  side = 'bottom',
  iconOnly = false,
  orientation = 'vertical',
}: ShareSheetProps) {
  const {t} = useTranslation('common')
  const url = siteURL + slug

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)

      alert(t('share.link-copied'))
    } catch (err: any) {
      console.error(err.message)

      alert(t('share.link-copy-failed'))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={t('share-button')}
          variant="outline"
          size={iconOnly ? 'icon' : 'sm'}
          className="font-mono text-xs"
        >
          <Share
            className={
              iconOnly
                ? 'size-4 text-aquamarine-500'
                : 'mr-2 size-3 text-aquamarine-500'
            }
          />
          {iconOnly ? '' : t('share-button')}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full font-mono" side={side}>
        <div
          className={`flex items-center justify-center py-2 ${
            orientation === 'vertical'
              ? 'flex-col space-y-4'
              : 'flex-row space-x-4'
          }`}
        >
          <WhatsappShareButton url={url} title={title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role="button"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  aria-label={t('share.share-whatsapp')}
                  aria-pressed="false"
                >
                  <svg
                    className="size-4"
                    data-icon="whatsapp"
                    viewBox="0 0 24 24"
                    style={{fill: '#25d366'}}
                  >
                    <title>{t('share.share-whatsapp')}</title>

                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                  </svg>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>{t('share.share-whatsapp')}</p>
              </TooltipContent>
            </Tooltip>
          </WhatsappShareButton>

          <TwitterShareButton url={url} title={`${title} via @waybove`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role="button"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  aria-label={t('share.share-twitter')}
                  aria-pressed="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1da1f2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                    data-icon="twitter"
                  >
                    <title>{t('share.share-twitter')}</title>

                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>{t('share.share-twitter')}</p>
              </TooltipContent>
            </Tooltip>
          </TwitterShareButton>

          <RedditShareButton url={url} title={title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role="button"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  aria-label={t('share.share-reddit')}
                  aria-pressed="false"
                >
                  <svg
                    className="size-4"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{fill: '#ff4500'}}
                  >
                    <title>{t('share.share-reddit')}</title>

                    <path d="M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.241-2.296-3.103-.045-.016-.088-.039-.126-.07-.026-.02-.045-.042-.067-.064-1.792-1.234-4.356-2.008-7.196-2.008-2.815 0-5.354.759-7.146 1.971-.014.018-.029.033-.049.049-.039.033-.084.06-.13.075-1.206.862-2.042 1.937-2.354 3.123 0 .058-.014.114-.037.171l-.008.015zm9.773 5.441c-1.794 0-3.057-.389-3.863-1.197-.173-.174-.173-.457 0-.632.176-.165.46-.165.635 0 .63.629 1.685.943 3.228.943 1.542 0 2.591-.3 3.219-.929.165-.164.45-.164.629 0 .165.18.165.465 0 .645-.809.808-2.065 1.198-3.862 1.198l.014-.028zm-3.606-7.573c-.914 0-1.677.765-1.677 1.677 0 .91.763 1.65 1.677 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm7.233 0c-.914 0-1.678.765-1.678 1.677 0 .91.764 1.65 1.678 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm4.548-1.595c1.037.833 1.8 1.821 2.189 2.904.45-.336.719-.864.719-1.449 0-1.002-.815-1.816-1.818-1.816-.399 0-.778.129-1.09.363v-.002zM2.711 9.963c-1.003 0-1.817.816-1.817 1.818 0 .543.239 1.048.644 1.389.401-1.079 1.172-2.053 2.213-2.876-.302-.21-.663-.329-1.039-.329v-.002zm9.217 12.079c-5.906 0-10.709-3.205-10.709-7.142 0-.275.023-.544.068-.809C.494 13.598 0 12.729 0 11.777c0-1.496 1.227-2.713 2.725-2.713.674 0 1.303.246 1.797.682 1.856-1.191 4.357-1.941 7.112-1.992l1.812-5.524.404.095s.016 0 .016.002l4.223.993c.344-.798 1.138-1.36 2.065-1.36 1.229 0 2.231 1.004 2.231 2.234 0 1.232-1.003 2.234-2.231 2.234s-2.23-1.004-2.23-2.23l-3.851-.912-1.467 4.477c2.65.105 5.047.854 6.844 2.021.494-.464 1.144-.719 1.833-.719 1.498 0 2.718 1.213 2.718 2.711 0 .987-.54 1.886-1.378 2.365.029.255.059.494.059.749-.015 3.938-4.806 7.143-10.72 7.143l-.034.009zm8.179-19.187c-.74 0-1.34.599-1.34 1.338 0 .738.6 1.34 1.34 1.34.732 0 1.33-.6 1.33-1.334 0-.733-.598-1.332-1.347-1.332l.017-.012z" />
                  </svg>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>{t('share.share-reddit')}</p>
              </TooltipContent>
            </Tooltip>
          </RedditShareButton>

          <FacebookShareButton url={url}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role="button"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  aria-label={t('share.share-facebook')}
                  aria-pressed="false"
                >
                  <svg
                    className="size-4"
                    data-icon="facebook"
                    viewBox="0 0 32 32"
                    style={{fill: '#316ff6'}}
                  >
                    <title>{t('share.share-facebook')}</title>

                    <path d="M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z" />
                  </svg>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>{t('share.share-facebook')}</p>
              </TooltipContent>
            </Tooltip>
          </FacebookShareButton>

          <Tooltip>
            <TooltipTrigger>
              <Button
                aria-label={t('share.copy-link')}
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
              >
                <Link className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{t('share.copy-link')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ShareSheet
