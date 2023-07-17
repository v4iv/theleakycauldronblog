import { Link } from "gatsby"
import * as React from "react"
import { TypographyH1, TypographyList } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"

const Header: React.FC = () => {
  return (
    <header>
      <TypographyH1>The Leaky Cauldron Blog</TypographyH1>

      <TypographyList>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </TypographyList>

      <Separator />
    </header>
  )
}

export default Header
