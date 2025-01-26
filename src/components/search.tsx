import React from "react"
import { Search } from "lucide-react"
import type { CollectionEntry } from "astro:content"

import { useTranslations } from "@/i18n/utils"
import { defaultLang, type languages } from "@/i18n/ui"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function SearchBox({
  lang = defaultLang,
  open,
  setOpen,
  articles,
}: {
  lang?: keyof typeof languages
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  articles: CollectionEntry<"articles">[]
}) {
  const t = useTranslations(lang)

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <CommandInput placeholder={t("search.placeholder")} />

      <CommandList aria-describedby="">
        <CommandEmpty>{t("search.no-results")}</CommandEmpty>

        <CommandGroup heading={t("search.suggestions")}>
          <CommandItem>
            <a href="/tags" className="text-lg">
              {t("navbar.tags")}
            </a>
          </CommandItem>
          <CommandItem>
            <a href="/about" className="text-lg">
              {t("navbar.about")}
            </a>
          </CommandItem>
          <CommandItem>
            <a href="/contact" className="text-lg">
              {t("navbar.contact")}
            </a>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading={t("search.articles")}>
          {articles.map((article, idx) => (
            <CommandItem key={`${article.id}-${idx}`}>
              <a href={`/articles/${article.id}`} className="text-lg">
                {article.data.title}
              </a>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function SearchButton({
  lang = defaultLang,
  articles,
}: {
  lang?: keyof typeof languages
  articles: CollectionEntry<"articles">[]
}) {
  const t = useTranslations(lang)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <span
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center text-xl uppercase transition-all duration-300 hover:scale-95 hover:text-muted-foreground"
      >
        {t("navbar.search")}
        <Search className="ml-2 size-5" />
      </span>

      <SearchBox open={open} setOpen={setOpen} articles={articles} />
    </>
  )
}

export function SearchField({
  lang = defaultLang,
  articles,
}: {
  lang?: keyof typeof languages
  articles: CollectionEntry<"articles">[]
}) {
  const t = useTranslations(lang)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="animate-reveal-reverse relative flex grow">
      <Search className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-teal-300" />

      <Button
        size="lg"
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full cursor-text justify-start rounded-none border-none bg-indigo-800 px-3 text-lg uppercase text-muted-foreground hover:bg-indigo-800 hover:text-muted-foreground"
      >
        {t("search.placeholder")}
      </Button>

      <SearchBox open={open} setOpen={setOpen} articles={articles} />
    </div>
  )
}
