import React from 'react'
import PageLayout from '../PageLayout'
import { BreadCrumb } from '../components/sections/BreadCrumb'
import Blog from '../components/sections/Blog'

const page = () => {
  return (
    <PageLayout>
      <BreadCrumb  />
      <Blog />
    </PageLayout>
  )
}

export default page
