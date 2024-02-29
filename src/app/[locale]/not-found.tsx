import {useTranslations} from 'next-intl'

import {Separator} from '@/components/ui/separator'

export default function NotFoundPage() {
  const t = useTranslations('common')

  return (
    <header className="mx-auto flex min-h-screen w-full max-w-screen-md items-center justify-center">
      <div className="flex h-8 items-center space-x-4">
        <h1 className="text-sm text-muted-foreground md:text-xl">404</h1>

        <Separator orientation="vertical" />

        <p className="text-sm text-muted-foreground md:text-xl">
          {t('page-not-found')}
        </p>
      </div>
    </header>
  )
}
