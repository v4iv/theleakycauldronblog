import * as React from 'react'
import {lazy, Suspense, useState, useEffect} from 'react'
import {Link} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {Equal, Search, AtSign, Home, MessageCircle} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

const CommandPalette = lazy(() => import('@/components/CommandPalette'))

function NavBar() {
  const {t} = useTranslation('common')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <nav className="mx-auto w-full max-w-screen-md">
        <div className="px-3 md:px-0 py-3 md:py-5">
          <div className="flex">
            <div className="flex flex-grow">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link aria-label={t('site-short-name')} to="/">
                    <Avatar className="mr-2 flex md:hidden">
                      <AvatarImage
                        src="/icon-192-maskable.png"
                        alt="the-leaky-cauldron-blog"
                      />
                      <AvatarFallback>{t('site-short-name')}</AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>

                <TooltipContent>
                  <p>{t('home')}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="scroll-m-20 text-2xl font-extrabold tracking-wider leading-relaxed">
                    <Link
                      className="hidden md:flex hover:text-muted-foreground"
                      to="/"
                    >
                      {t('site-name')}
                    </Link>

                    <Link
                      className="flex md:hidden hover:text-gray-500 transition-colors duration-100"
                      to="/"
                    >
                      {t('site-short-name')}
                    </Link>
                  </h3>
                </TooltipTrigger>

                <TooltipContent>
                  <p>{t('home')}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={t('search')}
                    asChild
                  >
                    <Link to="/search">
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>{t('search')}</p>
                </TooltipContent>
              </Tooltip>

              <Sheet>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={t('menu')}
                      >
                        <Equal className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{t('menu')}</p>
                  </TooltipContent>
                </Tooltip>

                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle />
                  </SheetHeader>

                  <SheetDescription className="flex-grow">
                    <Button
                      variant="ghost"
                      className="block my-5"
                      aria-label={t('home')}
                      asChild
                    >
                      <Link className="flex" to="/">
                        <Home className="mr-2 h-4 w-4" />
                        {t('home')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="block my-5"
                      aria-label={t('search')}
                      asChild
                    >
                      <Link className="flex" to="/search">
                        <Search className="mr-2 h-4 w-4" />
                        {t('search')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="block my-5"
                      aria-label={t('about')}
                      asChild
                    >
                      <Link className="flex" to="/about">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t('about')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="block my-5"
                      aria-label={t('contact')}
                      asChild
                    >
                      <Link className="flex" to="/contact">
                        <AtSign className="mr-2 h-4 w-4" />
                        {t('contact')}
                      </Link>
                    </Button>
                  </SheetDescription>

                  <SheetFooter>
                    <p className="font-mono text-[10px] text-muted-foreground hidden md:flex md:items-center">
                      {t('quick-search')}&nbsp;&raquo;&nbsp;
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">&#8984;</span>K
                      </kbd>
                    </p>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {open && (
        <Suspense>
          <CommandPalette open={open} setOpen={setOpen} />
        </Suspense>
      )}
    </>
  )
}

export default NavBar
