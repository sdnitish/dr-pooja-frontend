import React from 'react'
import AllServices from '../components/sections/AllServices'
import PageLayout from '../PageLayout'
import { BreadCrumb } from '../components/sections/BreadCrumb'

const page = () => {
  return (
    <PageLayout>
      <BreadCrumb  />
      <AllServices />
    </PageLayout>
  )
}

export default page
