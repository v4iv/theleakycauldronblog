import React from 'react'
import {Link} from 'gatsby'
import {
  Equal,
  Search,
  AtSign,
  Home,
  MessageCircle,
  Moon,
  Sun,
  Hash,
} from 'lucide-react'
import useDarkMode from 'use-dark-mode'
import {StaticImage} from 'gatsby-plugin-image'
import {useTranslation} from 'gatsby-plugin-react-i18next'

import {darkModeConfig} from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Avatar} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import CelebrationConfetti from '@/components/CelebrationConfetti'

function NavBar() {
  const {t} = useTranslation('common')
  const darkMode = useDarkMode(false, darkModeConfig)

  return (
    <nav className="mx-auto w-full max-w-screen-md font-mono">
      <CelebrationConfetti />
      <div className="p-3 md:px-0 md:py-5">
        <div className="flex">
          <div className="flex grow">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link aria-label={t('site-short-name')} to="/">
                  <Avatar className="mr-2 flex md:hidden">
                    <StaticImage
                      src="../../assets/images/avatar.png"
                      placeholder="blurred"
                      alt="the-leaky-cauldron-blog"
                    />
                  </Avatar>
                </Link>
              </TooltipTrigger>

              <TooltipContent>
                <p>{t('home')}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="scroll-m-20 text-2xl font-bold leading-relaxed tracking-wider">
                  <Link
                    className="hidden hover:text-muted-foreground md:flex"
                    to="/"
                  >
                    {t('site-name')}
                  </Link>

                  <Link
                    className="flex transition-colors duration-100 hover:text-gray-500 md:hidden"
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
                    <Search className="size-4 text-aquamarine-500" />
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
                      <Equal className="size-6 text-aquamarine-500" />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>

                <TooltipContent>
                  <p>{t('menu')}</p>
                </TooltipContent>
              </Tooltip>

              <SheetContent className="flex flex-col font-mono">
                <SheetHeader>
                  <SheetTitle className="text-aquablue-500">
                    {t('menu')}
                  </SheetTitle>
                </SheetHeader>

                <SheetDescription className="flex grow flex-col gap-y-5">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    aria-label={t('home')}
                    asChild
                  >
                    <Link className="flex" to="/">
                      <Home className="mr-3 size-4 text-aquamarine-500" />
                      {t('home')}
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    aria-label={t('search')}
                    asChild
                  >
                    <Link className="flex" to="/search/">
                      <Search className="mr-2 size-4 text-aquamarine-500" />
                      {t('search')}
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    aria-label={t('tags')}
                    asChild
                  >
                    <Link className="flex" to="/tags/">
                      <Hash className="mr-2 size-4 text-aquamarine-500" />
                      {t('tags')}
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    aria-label={t('about')}
                    asChild
                  >
                    <Link className="flex" to="/about/">
                      <MessageCircle className="mr-2 size-4 text-aquamarine-500" />
                      {t('about')}
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    aria-label={t('contact')}
                    asChild
                  >
                    <Link className="flex" to="/contact/">
                      <AtSign className="mr-2 size-4 text-aquamarine-500" />
                      {t('contact')}
                    </Link>
                  </Button>
                </SheetDescription>

                <SheetFooter className="flex">
                  <div className="grow" />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Sun className="size-[1.2rem] rotate-0 scale-100 text-aquamarine-500 transition-all dark:-rotate-90 dark:scale-0" />

                        <Moon className="absolute size-[1.2rem] rotate-90 scale-0 text-aquamarine-500 transition-all dark:rotate-0 dark:scale-100" />

                        <span className="sr-only">{t('toggle-theme')}</span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="top" align="end">
                      <DropdownMenuItem
                        className="font-mono"
                        onClick={darkMode.disable}
                      >
                        {t('light')}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="font-mono"
                        onClick={darkMode.enable}
                      >
                        {t('dark')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
