import * as React from 'react'
import {Separator} from '@/components/ui/separator'
import {TypographyMuted} from '@/components/ui/typography'

const Footer: React.FC = () => {
  return (
    <footer>
      <Separator />

      <TypographyMuted>
        Copyright &copy; 2018-{new Date().getFullYear().toString()} The Leaky
        Cauldron Blog. All Rights Reserved.
      </TypographyMuted>
    </footer>
  )
}

export default Footer
