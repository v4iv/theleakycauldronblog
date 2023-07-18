import * as React from 'react'
import {Separator} from '@/components/ui/separator'
import {TypographyMuted} from '@/components/ui/typography'

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto w-full max-w-screen-md">
      <Separator />

      <div className="py-10 px-3 md:px-0 md:text-left text-center">
        <TypographyMuted>
          Copyright &copy; 2018-{new Date().getFullYear().toString()} The Leaky
          Cauldron Blog. All Rights Reserved.
        </TypographyMuted>
      </div>
    </footer>
  )
}

export default Footer
