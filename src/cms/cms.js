import CMS from 'netlify-cms-app'
import '../assets/stylesheets/styles.scss'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ArticlePreview from './preview-templates/ArticlePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
    },
  },
})
CMS.registerPreviewTemplate('blog', ArticlePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
