import * as React from 'react'
import {lazy, Suspense, useState, useEffect} from 'react'
import {Link} from 'gatsby'
import {Equal, Search, AtSign, Home, MessageCircle} from 'lucide-react'
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
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

const CommandPalette = lazy(() => import('@/components/CommandPalette'))

function NavBar() {
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
              <Link aria-label="tlcb" to="/">
                <Avatar className="mr-2 flex md:hidden">
                  <AvatarImage
                    src="/icons/icon-192x192.png"
                    alt="the-leaky-cauldron-blog"
                  />
                  <AvatarFallback>tlcb</AvatarFallback>
                </Avatar>
              </Link>

              <h3 className="scroll-m-20 text-2xl font-extrabold tracking-wider leading-relaxed">
                <Link
                  className="hidden md:flex hover:text-gray-500 transition-colors duration-100"
                  to="/"
                >
                  the leaky cauldron blog
                </Link>

                <Link
                  className="flex md:hidden hover:text-gray-500 transition-colors duration-100"
                  to="/"
                >
                  tlcb
                </Link>
              </h3>
            </div>

            <div className="flex">
              <Button
                className="mr-2"
                variant="outline"
                size="icon"
                aria-label="Search"
                asChild
              >
                <Link to="/search">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>

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
                      <Link className="flex" to="/">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Link>
                    </Button>

                    <Button variant="ghost" className="block my-5" asChild>
                      <Link className="flex" to="/search">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Link>
                    </Button>

                    <Button variant="ghost" className="block my-5" asChild>
                      <Link className="flex" to="/about">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        About
                      </Link>
                    </Button>

                    <Button variant="ghost" className="block my-5" asChild>
                      <Link className="flex" to="/contact">
                        <AtSign className="mr-2 h-4 w-4" />
                        Contact
                      </Link>
                    </Button>
                  </SheetDescription>

                  <Separator />

                  <SheetFooter>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      QUICK SEARCH&nbsp;&raquo;&nbsp;
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </p>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <Separator />
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
