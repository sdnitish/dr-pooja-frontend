import React from 'react'
import PageLayout from '../PageLayout'
import { BreadCrumb } from '../components/sections/BreadCrumb'
import { ContactUs } from '../components/sections/ContactUs'

const page = () => {
  return (
    <PageLayout>
      <BreadCrumb name={"Contact"} />
      <ContactUs />
      <div className="my-10">
        <div className="container ">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.3324966721866!2d77.0406059!3d28.439391699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19111c7a9343%3A0xa1d041decea5baa0!2sDr.%20Pooja%20Mittal%20-%20Best%20Gynaecologist%2C%20Obstetrician%20and%20Laparoscopic%20surgeon%20%7C%20Medanta%20Hospitals%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1765817786416!5m2!1sen!2sin" className='w-full' height="350" allowfullscreen="" loading="lazy" ></iframe>
        </div>
      </div>
    </PageLayout>
  )
}

export default page
