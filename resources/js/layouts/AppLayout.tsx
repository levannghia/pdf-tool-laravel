import NavBar from '@/components/NavBar'
import { Head } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'
import Footer from '@/components/Footer'
import { Worker } from '@react-pdf-viewer/core';

function AppLayout({title, footer = false, children} : PropsWithChildren<{title: string, footer?: boolean}> ){
  return (
    <>
        <Head title={title}/>
        <NavBar />
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className='flex '>{children}</div>
        </Worker>
        {footer && <Footer/>}
    </>
  )
}

export default AppLayout