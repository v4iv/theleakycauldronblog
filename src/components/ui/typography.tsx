import React from 'react'

export function TypographyH1({children}: {children: React.ReactNode}) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function TypographyH2({children}: {children: React.ReactNode}) {
  return (
    <h2 className="scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}

export function TypographyH3({children}: {children: React.ReactNode}) {
  return (
    <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
      {children}
    </h3>
  )
}

export function TypographyH4({children}: {children: React.ReactNode}) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

export function TypographyP({children}: {children: React.ReactNode}) {
  return (
    <p className="leading-7 font-light [&:not(:first-child)]:mt-6">
      {children}
    </p>
  )
}

export function TypographyBlockQuote({children}: {children: React.ReactNode}) {
  return <blockquote className="">{children}</blockquote>
}

export function TypographyList({children}: {children: React.ReactNode}) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}

export function TypographyInlineCode({children}: {children: React.ReactNode}) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

export function TypographyLead({children}: {children: React.ReactNode}) {
  return <p className="text-lg md:text-xl text-muted-foreground">{children}</p>
}

export function TypographyLarge({children}: {children: React.ReactNode}) {
  return <div className="text-lg font-semibold">{children}</div>
}

export function TypographySmall({children}: {children: React.ReactNode}) {
  return <small className="text-sm font-medium leading-none">{children}</small>
}

export function TypographyMuted({children}: {children: React.ReactNode}) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
