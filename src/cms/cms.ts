import CMS from 'netlify-cms-app'
import '../styles/globals.css'
import AboutPagePreview from './AboutPagePreview'
import ContactPagePreview from './ContactPagePreview'
import ArticlePagePreview from './ArticlePagePreview'

CMS.init()
CMS.registerPreviewTemplate('blog', ArticlePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
