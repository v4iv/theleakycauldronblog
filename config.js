const config = {
  siteTitle: `The Leaky Cauldron Blog`, // Site title.
  siteTitleAlt: `TLC Blog`, // Alternative site title for SEO.
  siteLogo: `/icons/icon-512x512.png`, // Logo used for SEO and manifest.
  siteUrl: `https://theleakycauldronblog.com`, // Domain of your website without pathPrefix.
  pathPrefix: '', // Prefixes all links. For cases when deployed to example.github.io/gatsby-starter-business/.
  siteDescription: `The Leaky Cauldron Blog is the personal blog of Vaibhav Sharma. A Brew of Awesomeness with a Pinch of Magic...`, // Website description used for RSS feeds/meta description tag.
  siteRss: `/rss.xml`,
  googleTagManagerID: process.env.GTM_ID || ``, // GTM tracking ID.
  userName: `Vaibhav Sharma`,
  coffeeLink: `https://www.buymeacoffee.com/vaibhavsharma`,
  userTwitter: `aleakycauldron`,
  siteFBAppID: ``,
  userLocation: `Delhi NCR, India`,
  copyright: `Copyright © The Leaky Cauldron Blog 2018-${new Date().getFullYear().toString().substr(2, 2)}. All Rights Reserved.`, // Copyright string for the footer of the website and RSS feed.
  themeColor: `#676767`, // Used for setting manifest and progress theme colors.
  backgroundColor: `#ffffff`, // Used for setting manifest background color.
  cookieConsent: `This website uses cookies which are used to collect anonymous information to improve your browsing experience and for analytics and metrics.`,
}

module.exports = config
