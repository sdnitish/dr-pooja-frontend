import React from 'react'
import PageLayout from '@/app/PageLayout'
import { BreadCrumb } from '@/app/components/sections/BreadCrumb'
import { ContactUs } from '@/app/components/sections/ContactUs'

const page = () => {
  return (
    <PageLayout>
      <BreadCrumb  />
      <ContactUs />
    </PageLayout>
  )
}

export default page