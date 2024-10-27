import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {}

function Warapper({children, className, ...rest}: PropsWithChildren<WrapperProps>) {
  return (
    <section className={clsx("relative mx-auto mt-16 min-h-[calc(100vh_-_128px)] w-full flex-col gap-8 p-4 text-foreground sm:gap-12", className)} {...rest}>
        {children}
    </section>
  )
}

export default Warapper