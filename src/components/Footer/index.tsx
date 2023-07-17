import * as React from "react"
import { TypographyP } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"

const Footer: React.FC = () => {
  return (
    <footer>
      <Separator />

      <TypographyP>
        Copyright &copy; 2018-{new Date().getFullYear().toString()} The Leaky
        Cauldron Blog. All Rights Reserved.
      </TypographyP>
    </footer>
  )
}

export default Footer
