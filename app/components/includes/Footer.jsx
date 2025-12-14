import React from 'react'
import SocialIcon from '../cards/SocialIcon'
import Link from 'next/link'
import { HiChevronRight, HiOutlineMailOpen } from 'react-icons/hi'
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const Footer = ({ siteInfo }) => {
  const services = [
    {
      title: "High-risk pregnancy care & delivery ",
      slug: "service-name",
    },
    {
      title: "Gynecological Laparoscopic surgeries",
      slug: "service-name",
    },
    {
      title: "Hysteroscopic Surgeries",
      slug: "service-name",
    },
    {
      title: "Menopausal problems",
      slug: "service-name",
    },
    {
      title: "PCOS management",
      slug: "service-name",
    },
    {
      title: "Subfertility & Infertility",
      slug: "service-name",
    },
    {
      title: "Cervical cancer screening and Vaccination",
      slug: "service-name",
    },
     {
      title: "Surgery for female genital prolapse ",
      slug: "service-name",
    },
     {
      title: "Abortion services",
      slug: "service-name",
    },
    {
      title: "Robotic assisted  gynaecological surgeries",
      slug: "service-name",
    },
    {
      title: "Adolescence health problems",
      slug: "service-name",
    },
    {
      title: "Treatment of heavy and irregular periods",
      slug: "service-name",
    },
    {
      title: "Treatment of vaginal infections",
      slug: "service-name",
    },
    {
      title: "Preconceptional counselling",
      slug: "service-name",
    },
    {
      title: "Post delivery care and counselling",
      slug: "service-name",
    },
    {
      title: "Treatment of fibroids, ovarian cysts and heavy periods",
      slug: "service-name",
    },
  ]
  return (
    <>
      <footer className="services bg-[url('/img/footer-bg.jpg')] bg-no-repeat bg-center bg-cover pt-10 md:pt-20">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 align-center  border-b-1 border-white md:pb-10 pb-3 mb-9">
            <div className="">
              <img className='w-[200px]' src="/logo.png" alt="" />
            </div>
            <div className="foot_socal flex justify-end items-center gap-4">
               <SocialIcon siteInfo={siteInfo} />
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-x-6  grid-cols-1 w-full text-white">
            <div className='col-span-2'>
              <span className='block text-2xl font-bold relative mb-6 pb-2'>Quick Links</span>
              <ul className='md:flex flex-wrap gap-x-4'>
                {
                  services.map((item, index) => (
                    <li className='md:w-[48%]' key={index}><Link className='flex items-center gap-1 text-[15px] py-[3px]' href={`/services/${item.slug}`}> {item.title}</Link></li>
                  ))
                }
              </ul>
            </div>
            <div>
              <span className='block text-2xl font-bold relative mb-6 pb-2'>Contact Us</span>
              <div className="flex items-center gap-2 my-4">
                <FaLocationDot className="text-[#8a56f0] text-2xl" />
                <div>
                  <Link href={'/'} className="">256 Lonely Street Ave, Brooklyn
                    CA, 25943. United State</Link>
                </div>
              </div>
              <div className="flex items-center gap-2 my-4">
                <HiOutlineMailOpen className="text-[#8a56f0] text-2xl" />
                <div>
                  <Link href={`mailto:${siteInfo?.primaryEmail}`} className="font-semibold">{siteInfo?.primaryEmail}</Link>
                </div>
              </div>
              <div className="flex items-center gap-2 my-4">
                <IoCall className="text-[#8a56f0] text-2xl" />
                <div>
                  <Link href={`tel:${siteInfo?.primaryPhone}`} className="font-semibold">{siteInfo?.primaryPhone}</Link>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-12">
                 <SocialIcon siteInfo={siteInfo} />
              </div>
            </div>
            <div>
              <span className='block text-2xl font-bold relative mb-6 pb-2'>We are Availablex</span>
                <ul>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Monday :<span className='text-[#]'>9:00 AM - 5:00 PM</span></li>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Tuesday   :<span className='text-[#]'>9:00 AM - 5:00 PM</span></li>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Wednesday  :<span className='text-[#]'>9:00 AM - 5:00 PM</span></li>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Thursday  :<span className='text-[#]'>9:00 AM - 5:00 PM</span></li>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Friday  :<span className='text-[#]'>9:00 AM - 5:00 PM</span></li>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Saturday  :<span className='text-[#]'>9:00 AM - 5:00 PM</span></li>
                  <li className='flex items-center gap-2 text-[14px] py-[3px]'>Sunday  -<span className='text-[#]'>Closed</span></li>
                </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#06C5E0] bg-opacity-50 text-center text-white mt-15 py-4">
          <p>Copyright  2025 Medixi. All Rights Reserved By Vecuro.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer