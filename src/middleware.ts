import {NextRequest, NextResponse} from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

export default async function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Step 1: Use the incoming request
  const defaultLocale = requestHeaders.get('x-default-locale') || 'en'

  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  // requestHeaders.set('content-security-policy', ContentSecurityPolicy)

  // create new response
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales: ['en'],

    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'en',

    // Don't use a locale prefix for the default locale
    localePrefix: 'as-needed',
  })

  const intlResponse = handleI18nRouting(request)

  // Merge the headers from the response with the intlResponse headers
  for (const [key, value] of Object.entries(response.headers)) {
    intlResponse.headers.set(key, value)
  }

  // Step 3: Alter the response
  intlResponse.headers.set('x-default-locale', defaultLocale)

  return intlResponse
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
