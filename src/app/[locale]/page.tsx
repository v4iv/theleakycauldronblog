import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'

import {getArticles} from '@/lib/markdowns'
import Paginate from '@/components/paginate'
import ArticleCard from '@/components/article-card'

export default function Page({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('common')

  const articles = getArticles()

  return (
    <div className="flex flex-col">
      <div className="grow">
        <section className="mx-auto w-full max-w-screen-md">
          {articles.map((article, idx) => (
            <ArticleCard key={`${article.slug}-${idx}`} article={article} />
          ))}
        </section>
      </div>

      <Paginate />
    </div>
  )
}
