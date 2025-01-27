import React from "react"
import Fuse from "fuse.js"
import type { CollectionEntry } from "astro:content"
import { Search, X } from "lucide-react"

import { useTranslations } from "@/i18n/utils"
import { defaultLang, type languages } from "@/i18n/ui"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type HaystackItem = {
  id: string
  title: string
  description: string
  author: string
  tags: string[]
  data: CollectionEntry<"articles">["data"]
}

interface SearchResult {
  item: HaystackItem
  refIndex: number
}

export function SearchBar({
  lang = defaultLang,
  haystack,
}: {
  haystack: HaystackItem[]
  lang?: keyof typeof languages
}) {
  const t = useTranslations(lang)
  const params = new URLSearchParams(window.location.search)
  const q = params.get("q") as string
  const [query, setQuery] = React.useState<string>(q || "")
  const [results, setResults] = React.useState<SearchResult[] | null>(null)
  const needle = React.useDeferredValue(query)

  const handleQuery = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    setQuery(inputValue)

    history.replaceState(
      history.state,
      "",
      `${window.location.pathname}?q=${encodeURIComponent(inputValue)}`,
    )
  }

  const fuse = React.useMemo(
    () =>
      new Fuse(haystack, {
        keys: ["id", "title", "description", "author", "tags"],
        includeMatches: true,
        minMatchCharLength: 3,
        ignoreFieldNorm: true,
        threshold: 0.5,
      }),
    [haystack],
  )

  React.useEffect(() => {
    const searchResult = needle.length > 2 ? fuse.search(needle) : []

    setResults(searchResult)
  }, [needle])

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-screen-md px-3 py-5">
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="animate-reveal-reverse relative flex grow">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-teal-300" />

                <Input
                  autoFocus
                  spellCheck={false}
                  autoComplete="new-password"
                  aria-label={t("navbar.search")}
                  name={t("navbar.search")}
                  value={query}
                  placeholder={t("search.placeholder")}
                  onChange={handleQuery}
                  className="h-14 rounded-none md:text-2xl"
                />
              </div>
            </TooltipTrigger>

            <TooltipContent>
              <p>{t("navbar.search")}</p>
            </TooltipContent>
          </Tooltip>

          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  aria-label={t("navbar.close")}
                  onClick={() => history.back()}
                  className="size-14 rounded-none"
                >
                  <X className="animate-in spin-in" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{t("navbar.close")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="my-10 gap-3">
          {results?.map(({ item: { id, title, author }, refIndex }) => (
            <article
              className="space-y-3 border-b py-3 last:border-none"
              key={`${refIndex}-${id}`}
            >
              <h2 className="scroll-m-20 text-3xl font-bold tracking-wide transition-colors first:mt-0 md:text-4xl">
                <a
                  className="transition-colors duration-100 hover:text-muted-foreground"
                  href={`/articles/${id}`}
                >
                  {title}
                </a>
              </h2>

              <p className="font-mono text-muted-foreground">
                By <span className="uppercase">{author}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
