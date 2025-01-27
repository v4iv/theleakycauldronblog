import React from "react"

import { useTranslations } from "@/i18n/utils"
import { defaultLang, type languages } from "@/i18n/ui"
import { MenuButton } from "@/components/menu"

export default function StickyNavBar({
  lang = defaultLang,
}: {
  lang?: keyof typeof languages
}) {
  const [show, setShow] = React.useState(false)

  const t = useTranslations(lang)

  React.useEffect(() => {
    // navbar is displayed after scrolling for 100 pixels
    const handleVisibility = () => {
      document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
        ? setShow(true)
        : setShow(false)
    }

    window.addEventListener("scroll", handleVisibility)
    return () => {
      window.removeEventListener("scroll", handleVisibility)
    }
  }, [])

  return (
    <>
      {show && (
        <div
          className={`fixed top-0 z-40 w-full bg-slate-50/95 py-5 shadow-md animate-in slide-in-from-top dark:bg-slate-900/95`}
        >
          <div className="mx-auto flex w-full max-w-screen-xl items-center px-3">
            <div className="grow">
              <a
                href="/"
                className="truncate break-words bg-gradient-to-r from-yellow-400 via-rose-400 to-violet-500 bg-clip-text font-mono text-3xl font-extrabold tracking-wider text-transparent"
              >
                {t("navbar.short-name")}
              </a>
            </div>

            <MenuButton
              variant="outline"
              className="rounded-none border-none bg-transparent px-0 text-lg uppercase shadow-none transition-all duration-300 hover:bg-transparent hover:text-muted-foreground"
            />
          </div>
        </div>
      )}
    </>
  )
}
