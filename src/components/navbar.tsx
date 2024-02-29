'use client'

import React from 'react'
import {useTranslations} from 'next-intl'
import {Equal, Search, AtSign, Home, MessageCircle, Hash} from 'lucide-react'

import {Link} from '@/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {ThemeToggle} from '@/components/ui/theme-toggle'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'

export default function NavBar() {
  const t = useTranslations('common')

  return (
    <>
      <nav className="mx-auto w-full max-w-screen-md">
        <div className="p-3 md:px-0 md:py-5">
          <div className="flex">
            <div className="flex grow">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link aria-label={t('site-short-name')} href="/">
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
                  <h3 className="scroll-m-20 text-2xl font-extrabold leading-relaxed tracking-wider">
                    <Link
                      className="hidden hover:text-muted-foreground md:flex"
                      href="/"
                    >
                      {t('site-name')}
                    </Link>

                    <Link
                      className="flex transition-colors duration-100 hover:text-gray-500 md:hidden"
                      href="/"
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
                    <Link href="/search">
                      <Search className="size-4" />
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
                        <Equal className="size-6" />
                      </Button>
                    </SheetTrigger>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{t('menu')}</p>
                  </TooltipContent>
                </Tooltip>

                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle>{t('menu')}</SheetTitle>
                  </SheetHeader>

                  <SheetDescription className="flex grow flex-col gap-y-5">
                    <Button
                      variant="ghost"
                      className="justify-start"
                      aria-label={t('home')}
                      asChild
                    >
                      <Link className="flex" href="/">
                        <Home className="mr-3 size-4" />
                        {t('home')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="justify-start"
                      aria-label={t('search')}
                      asChild
                    >
                      <Link className="flex" href="/search">
                        <Search className="mr-2 size-4" />
                        {t('search')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="justify-start"
                      aria-label={t('tags')}
                      asChild
                    >
                      <Link className="flex" href="/tags">
                        <Hash className="mr-2 size-4" />
                        {t('tags')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="justify-start"
                      aria-label={t('about')}
                      asChild
                    >
                      <Link className="flex" href="/about">
                        <MessageCircle className="mr-2 size-4" />
                        {t('about')}
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="justify-start"
                      aria-label={t('contact')}
                      asChild
                    >
                      <Link className="flex" href="/contact">
                        <AtSign className="mr-2 size-4" />
                        {t('contact')}
                      </Link>
                    </Button>
                  </SheetDescription>

                  <SheetFooter className="flex">
                    <div className="grow" />

                    <ThemeToggle
                      themeToggle={t('toggle-theme')}
                      light={t('light')}
                      dark={t('dark')}
                      systemTheme={t('system')}
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <Separator />
    </>
  )
}
