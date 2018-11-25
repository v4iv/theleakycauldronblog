import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ArticlePreview from './preview-templates/ArticlePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('blog', ArticlePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
