import clsx from 'clsx';
import React from 'react'

type HeroProps = {
    title: string;
    description: string;
    btn: {
        title: string;
        className?: string;
    },
    dropLabel: string;
}

function Hero({ title, description, btn, dropLabel }: HeroProps) {
    return (
        <div className='mx-auto max-w-4xl space-y-4 text-center'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <p className='text-2xl text-foreground/80'>{description}</p>

            <div className='!my-8'>
                <label
                    htmlFor="files"
                    className={clsx(
                        "mx-auto block w-full max-w-xs cursor-pointer rounded-xl py-4 text-xl shadow",
                        btn.className,
                    )}
                    tabIndex={1}
                >
                    {btn.title}
                </label>
                <p className="mt-2 text-secondary-foreground">{dropLabel}</p>
            </div>
        </div>
    )
}


export default Hero
