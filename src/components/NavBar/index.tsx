import * as React from 'react'
import {Link} from 'gatsby'
import {Equal, Search} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {Separator} from '@/components/ui/separator'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

const NavBar: React.FC = () => {
  return (
    <nav className="mx-auto w-full max-w-screen-md">
      <div className="px-3 md:px-0 py-5">
        <div className="flex">
          <div className="flex flex-grow">
            <Link to="/">
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
                className="hidden md:flex hover:text-gray-500 transition-colors duration-200"
                to="/"
              >
                the leaky cauldron blog
              </Link>

              <Link
                className="flex md:hidden hover:text-gray-500 transition-colors duration-200"
                to="/"
              >
                tlcb
              </Link>
            </h3>
          </div>

          <div className="flex">
            <Button className="mr-2" variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Equal className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle />
                </SheetHeader>

                <SheetDescription>
                  <Button variant="ghost" className="block my-5" asChild>
                    <Link className="font-bold" to="/">
                      Home
                    </Link>
                  </Button>

                  <Button variant="ghost" className="block my-5" asChild>
                    <Link to="/about">About</Link>
                  </Button>

                  <Button variant="ghost" className="block my-5" asChild>
                    <Link to="/contact">Contact</Link>
                  </Button>
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Separator />
    </nav>
  )
}

export default NavBar
