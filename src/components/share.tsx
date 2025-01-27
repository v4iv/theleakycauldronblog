import React from "react"

import { cn } from "@/lib/utils"
import { useTranslations } from "@/i18n/utils"
import { defaultLang, type languages } from "@/i18n/ui"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ShareMobile({
  title,
  link,
  className,
  lang = defaultLang,
}: {
  title: string
  link: string
  className?: string
  lang?: keyof typeof languages
}) {
  const t = useTranslations(lang)
  return (
    <TooltipProvider>
      <div className={cn(`flex gap-2 md:hidden`, className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.copy-url")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(link)
                  alert(t("share.url-copied"))
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-violet-600"
              >
                <title>{t("share.copy-url")}</title>
                <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                <line x1="8" x2="16" y1="12" y2="12" />
              </svg>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.copy-url")}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.share-sheet")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              onClick={async () => {
                try {
                  await navigator.share({
                    title: title,
                    text: title,
                    url: link,
                  })
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-violet-600"
              >
                <title>{t("share.share-sheet")}</title>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.share-sheet")}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function Share({
  title,
  link,
  className,
  lang = defaultLang,
}: {
  title: string
  link: string
  className?: string
  lang?: keyof typeof languages
}) {
  const t = useTranslations(lang)

  return (
    <TooltipProvider>
      <div className={cn(`flex gap-2`, className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.bluesky")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              asChild
            >
              <a
                href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${link}`)}`}
              >
                <svg
                  role="img"
                  data-icon={t("social.bluesky")}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 fill-violet-600"
                >
                  <title>{t("social.bluesky")}</title>
                  <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
                </svg>
              </a>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.bluesky")}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.whatsapp")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              asChild
            >
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${title} ${link}`)}`}
              >
                <svg
                  role="img"
                  data-icon={t("social.whatsapp")}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 fill-violet-600"
                >
                  <title>{t("social.whatsapp")}</title>
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                </svg>
              </a>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.whatsapp")}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.reddit")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              asChild
            >
              <a
                href={`http://www.reddit.com/submit?url=${link}&title=${encodeURIComponent(title)}`}
              >
                <svg
                  role="img"
                  data-icon={t("social.reddit")}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 fill-violet-600"
                >
                  <title>{t("social.reddit")}</title>
                  <path d="M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.241-2.296-3.103-.045-.016-.088-.039-.126-.07-.026-.02-.045-.042-.067-.064-1.792-1.234-4.356-2.008-7.196-2.008-2.815 0-5.354.759-7.146 1.971-.014.018-.029.033-.049.049-.039.033-.084.06-.13.075-1.206.862-2.042 1.937-2.354 3.123 0 .058-.014.114-.037.171l-.008.015zm9.773 5.441c-1.794 0-3.057-.389-3.863-1.197-.173-.174-.173-.457 0-.632.176-.165.46-.165.635 0 .63.629 1.685.943 3.228.943 1.542 0 2.591-.3 3.219-.929.165-.164.45-.164.629 0 .165.18.165.465 0 .645-.809.808-2.065 1.198-3.862 1.198l.014-.028zm-3.606-7.573c-.914 0-1.677.765-1.677 1.677 0 .91.763 1.65 1.677 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm7.233 0c-.914 0-1.678.765-1.678 1.677 0 .91.764 1.65 1.678 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm4.548-1.595c1.037.833 1.8 1.821 2.189 2.904.45-.336.719-.864.719-1.449 0-1.002-.815-1.816-1.818-1.816-.399 0-.778.129-1.09.363v-.002zM2.711 9.963c-1.003 0-1.817.816-1.817 1.818 0 .543.239 1.048.644 1.389.401-1.079 1.172-2.053 2.213-2.876-.302-.21-.663-.329-1.039-.329v-.002zm9.217 12.079c-5.906 0-10.709-3.205-10.709-7.142 0-.275.023-.544.068-.809C.494 13.598 0 12.729 0 11.777c0-1.496 1.227-2.713 2.725-2.713.674 0 1.303.246 1.797.682 1.856-1.191 4.357-1.941 7.112-1.992l1.812-5.524.404.095s.016 0 .016.002l4.223.993c.344-.798 1.138-1.36 2.065-1.36 1.229 0 2.231 1.004 2.231 2.234 0 1.232-1.003 2.234-2.231 2.234s-2.23-1.004-2.23-2.23l-3.851-.912-1.467 4.477c2.65.105 5.047.854 6.844 2.021.494-.464 1.144-.719 1.833-.719 1.498 0 2.718 1.213 2.718 2.711 0 .987-.54 1.886-1.378 2.365.029.255.059.494.059.749-.015 3.938-4.806 7.143-10.72 7.143l-.034.009zm8.179-19.187c-.74 0-1.34.599-1.34 1.338 0 .738.6 1.34 1.34 1.34.732 0 1.33-.6 1.33-1.334 0-.733-.598-1.332-1.347-1.332l.017-.012z" />
                </svg>
              </a>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.reddit")}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.facebook")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              asChild
            >
              <a
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(`${title} ${link}`)}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 text-violet-600"
                >
                  <title>{t("social.facebook")}</title>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.facebook")}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={t("share.copy-url")}
              size="icon"
              variant="outline"
              className="rounded-full text-violet-600"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(link)
                  alert(t("share.url-copied"))
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-violet-600"
              >
                <title>{t("share.copy-url")}</title>
                <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                <line x1="8" x2="16" y1="12" y2="12" />
              </svg>
            </Button>
          </TooltipTrigger>

          <TooltipContent>{t("share.copy-url")}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
