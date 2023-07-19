import * as React from 'react'
import {Dispatch, SetStateAction} from 'react'
import {navigate, graphql, useStaticQuery} from 'gatsby'
import {AtSign, Circle, Home, MessageCircle, Search} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

interface CommandPaletteProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CommandPalette: React.FC<CommandPaletteProps> = (props) => {
  const {open, setOpen} = props

  // Not suitable for large number of pages
  const {
    localSearchPages: {store},
  }: {
    localSearchPages: {
      store: {
        [key: string]: {
          id: string
          title: string
          slug: string
          templateKey: string
        }
      }
    }
  } = useStaticQuery(graphql`
    query Search {
      localSearchPages {
        store
      }
    }
  `)

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Quick search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => navigate('/')}>
              <Home className="mr-2" /> Home
            </CommandItem>

            <CommandItem onSelect={() => navigate('/search')}>
              <Search className="mr-2" /> Search
            </CommandItem>

            <CommandItem onSelect={() => navigate('/about')}>
              <MessageCircle className="mr-2" />
              About
            </CommandItem>

            <CommandItem onSelect={() => navigate('/contact')}>
              <AtSign className="mr-2" />
              Contact
            </CommandItem>
          </CommandGroup>

          {/* not suitable for large number of pages */}
          <CommandGroup heading="Articles">
            {Object.entries(store)
              .filter(([, val]) => val.templateKey === 'article-page')
              .map(([key, val]) => (
                <CommandItem key={key} onSelect={() => navigate(val.slug)}>
                  <Circle className="mr-2 h-2 w-2" />
                  {val.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandPalette
