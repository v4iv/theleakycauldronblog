import * as React from 'react'
import {GatsbySSR} from 'gatsby'
import {TooltipProvider} from './src/components/ui/tooltip'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return <TooltipProvider>{element}</TooltipProvider>
}
