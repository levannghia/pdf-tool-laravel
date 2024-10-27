import NavBar from '@/components/NavBar'
import { Head } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'
import Footer from '@/components/Footer'

function AppLayout({title, footer = false, children} : PropsWithChildren<{title: string, footer?: boolean}> ){
  return (
    <>
        <Head title={title}/>
        <NavBar />
        <div className='flex'>{children}</div>
        {footer && <Footer/>}
    </>
  )
}

export default AppLayout