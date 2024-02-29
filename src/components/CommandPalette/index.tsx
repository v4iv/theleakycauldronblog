import React, {Dispatch, SetStateAction} from 'react'
import {navigate, graphql, useStaticQuery} from 'gatsby'
import {useTranslation} from 'gatsby-plugin-react-i18next'
import {AtSign, Circle, Hash, Home, MessageCircle, Search} from 'lucide-react'
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

function CommandPalette({open, setOpen}: CommandPaletteProps) {
  const {t} = useTranslation('common')

  // Not suitable for large number of pages, use publicStoreURL instead
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
    query CommandSearch {
      localSearchPages {
        store
      }
    }
  `)

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('command-palette.quick-search')} />
        <CommandList>
          <CommandEmpty>{t('command-palette.no-results')}</CommandEmpty>

          <CommandGroup heading={t('command-palette.pages')}>
            <CommandItem onSelect={() => navigate('/')}>
              <Home className="mr-2" /> {t('home')}
            </CommandItem>

            <CommandItem onSelect={() => navigate('/search/')}>
              <Search className="mr-2" /> {t('search')}
            </CommandItem>

            <CommandItem onSelect={() => navigate('/tags/')}>
              <Hash className="mr-2" /> {t('tags')}
            </CommandItem>

            <CommandItem onSelect={() => navigate('/about/')}>
              <MessageCircle className="mr-2" />
              {t('about')}
            </CommandItem>

            <CommandItem onSelect={() => navigate('/contact/')}>
              <AtSign className="mr-2" />
              {t('contact')}
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading={t('command-palette.articles')}>
            {Object.entries(store)
              .filter(([, val]) => val.templateKey === 'article-page')
              .map(([key, val]) => (
                <CommandItem key={key} onSelect={() => navigate(val.slug)}>
                  <Circle className="mr-2 size-2" />
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
