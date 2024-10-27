import Warapper from '@/components/Warapper'
import Hero from '@/components/welcome/Hero'
import Services from '@/components/welcome/Services'
import AppLayout from '@/layouts/AppLayout'
import React from 'react'

function Index() {
  return (
    <AppLayout title='Online PDF Tool' footer={true}>
        <Warapper>
            <Hero/>
            <Services/>
        </Warapper>
    </AppLayout>
  )
}

export default Index