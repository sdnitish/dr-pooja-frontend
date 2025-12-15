import React from 'react'
import PageLayout from '../PageLayout'
import { BreadCrumb } from '../components/sections/BreadCrumb'
import { ContactUs } from '../components/sections/ContactUs'

const page = () => {
  return (
    <PageLayout>
      <BreadCrumb name={"Contact"}  />
      <ContactUs />
    </PageLayout>
  )
}

export default page
