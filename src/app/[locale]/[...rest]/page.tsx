import {notFound} from 'next/navigation'
import {unstable_setRequestLocale} from 'next-intl/server'

export default function CatchAllPage({
  params: {locale},
}: {
  params: {locale: string}
}) {
  unstable_setRequestLocale(locale)

  notFound()
}
