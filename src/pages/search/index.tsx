import * as React from 'react'
import {useEffect, useState} from 'react'
import {graphql, useStaticQuery, Link, HeadProps, navigate} from 'gatsby'
import useSWR, {preload} from 'swr'
import {useLunr} from 'react-lunr'
import {useDebouncedCallback} from 'use-debounce'
import {StringParam, useQueryParam} from 'use-query-params'
import {Search, X} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {TooltipProvider} from '@/components/ui/tooltip'
import {TypographyH2, TypographyMuted} from '@/components/ui/typography'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function SearchPage() {
  const [q] = useQueryParam('q', StringParam)

  const [query, setQuery] = useState(q || '')

  const {
    localSearchPages: {publicIndexURL, publicStoreURL},
  }: {
    localSearchPages: {
      publicIndexURL: string
      publicStoreURL: string
    }
  } = useStaticQuery(graphql`
    query Search {
      localSearchPages {
        publicIndexURL
        publicStoreURL
      }
    }
  `)

  useEffect(() => {
    preload(publicIndexURL, fetcher)
    preload(publicStoreURL, fetcher)
  }, [preload, publicIndexURL, publicStoreURL])

  const {data: index, isLoading: isIndexLoading} = useSWR(
    publicIndexURL,
    fetcher,
  )
  const {data: store, isLoading: isStoreLoading} = useSWR(
    publicStoreURL,
    fetcher,
  )

  useEffect(() => {
    if (!isIndexLoading && !isStoreLoading) {
      setQuery(q || '')
    }
  }, [q, setQuery, isIndexLoading, isStoreLoading])

  // Might not work on development server
  const handleQuery = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    setQuery(inputValue)

    debouncedSetQueryParam(inputValue)
  }

  const debouncedSetQueryParam = useDebouncedCallback((inputValue) => {
    navigate(`?q=${encodeURIComponent(inputValue)}`, {replace: true})
  }, 500)

  const results = useLunr(query, index, store)

  return (
    <TooltipProvider>
      <nav className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <div className="flex space-x-2">
            <div className="flex flex-grow relative">
              <Search className="pointer-events-none h-4 w-4 absolute top-1/2 transform -translate-y-1/2 right-3" />
              <Input
                autoFocus
                aria-label="Search"
                name="Search"
                value={query}
                disabled={isIndexLoading || isStoreLoading}
                placeholder={
                  isIndexLoading || isStoreLoading ? 'Loading...' : 'Search...'
                }
                onChange={handleQuery}
              />
            </div>

            <div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Close"
                onClick={() => navigate(-1)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <Separator />

      <main className="min-h-screen">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="px-3 md:px-0 py-3 md:py-5">
            <div className="space-y-3">
              {results.map(({id, slug, title, author}: any) => (
                <article
                  className="space-y-3 py-3 border-b last:border-none"
                  key={id}
                >
                  <TypographyH2>
                    <Link
                      className="hover:text-gray-500 transition-colors duration-100"
                      to={slug}
                      replace
                    >
                      {title}
                    </Link>
                  </TypographyH2>

                  <TypographyMuted>By&nbsp;{author}</TypographyMuted>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Separator />

      <Footer />
    </TooltipProvider>
  )
}

export default SearchPage

export function Head({location: {pathname}}: HeadProps) {
  return <SEO pathname={pathname} title="Search | The Leaky Cauldron Blog" />
}
