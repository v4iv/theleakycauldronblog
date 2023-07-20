import * as React from 'react'
import {useEffect, useState} from 'react'
import {graphql, useStaticQuery, Link, HeadProps, navigate} from 'gatsby'
import useSWR, {preload} from 'swr'
import {useLunr} from 'react-lunr'
import {Equal, Search, AtSign, Home, MessageCircle} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {Separator} from '@/components/ui/separator'
import {TypographyH2, TypographyMuted} from '@/components/ui/typography'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'
import {StringParam, useQueryParam} from 'use-query-params'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function SearchPage() {
  const [q, setQueryParam] = useQueryParam('q', StringParam)

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

  const handleQuery = async (event: any) => {
    setQueryParam(event.target.value)
  }

  const results = useLunr(query, index, store)

  return (
    <>
      <nav className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <div className="flex space-x-2">
            <div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Home"
                onClick={() => navigate('/', {replace: true})}
              >
                <Home className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-grow relative">
              <Search className="pointer-events-none h-4 w-4 absolute top-1/2 transform -translate-y-1/2 right-3" />
              <Input
                autoFocus
                name="Search"
                value={query}
                disabled={isIndexLoading || isStoreLoading}
                placeholder={
                  isIndexLoading || isStoreLoading ? 'Loading...' : 'Search...'
                }
                onChange={handleQuery}
              />
            </div>

            <div className="flex">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Menu">
                    <Equal className="h-6 w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle />
                  </SheetHeader>

                  <SheetDescription className="flex-grow">
                    <Button variant="ghost" className="block my-5" asChild>
                      <Link className="flex" to="/" replace>
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Link>
                    </Button>

                    <Button variant="ghost" className="block my-5" asChild>
                      <Link className="flex" to="/about" replace>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        About
                      </Link>
                    </Button>

                    <Button variant="ghost" className="block my-5" asChild>
                      <Link className="flex" to="/contact" replace>
                        <AtSign className="mr-2 h-4 w-4" />
                        Contact
                      </Link>
                    </Button>
                  </SheetDescription>

                  <SheetFooter />
                </SheetContent>
              </Sheet>
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
    </>
  )
}

export default SearchPage

export function Head({location: {pathname}}: HeadProps) {
  return <SEO pathname={pathname} title="Search | The Leaky Cauldron Blog" />
}
