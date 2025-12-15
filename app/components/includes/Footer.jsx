import React from 'react'
import SocialIcon from '../cards/SocialIcon'
import Link from 'next/link'
import { HiChevronRight, HiOutlineMailOpen } from 'react-icons/hi'
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const Footer = ({ siteInfo , services }) => {

  return (
    <>
      <footer className="services bg-[url('/img/footer-bg.jpg')] bg-no-repeat bg-center bg-cover pt-10 md:pt-20">
        <div className="container">
          <div className="grid grid-cols-2 align-center  border-b-1 border-white md:pb-10 pb-3 mb-9">
            <Link href={'/'} className="">
              <img className='lg:w-[200px] w-[120px] ' src="/logo.png" alt="" />
            </Link>
            <div className="foot_socal flex justify-end items-center gap-4">
               <SocialIcon siteInfo={siteInfo} />
            </div>
          </div>
          <div className="grid lg:grid-cols-4 lg:gap-x-6 gap-y-10  grid-cols-1 w-full text-white">
            <div className='lg:col-span-2'>
              <span className='block lg:text-2xl lg:font-bold text-xl relative mb-6 pb-2'>Services</span>
              <ul className='md:flex flex-wrap gap-x-4'>
                {
                  services.map((item, index) => (
                    <li className='md:w-[48%]' key={index}><Link className='flex items-center gap-1 text-[15px] py-[3px]' href={`/service/${item.slug}`}> <HiChevronRight className="text-[#8a56f0]" /> {item.name}</Link></li>
                  ))
                }
              </ul>
            </div>
            <div>
              <span className='block lg:text-2xl lg:font-bold text-xl relative mb-6 pb-2'>Contact Us</span>
              <div className="flex items-center gap-2 my-4">
                <FaLocationDot className="text-[#8a56f0] text-2xl" />
                <div>
                 {siteInfo?.primaryAddress}
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
              <span className='block lg:text-2xl lg:font-bold text-xl relative mb-6 pb-2'>We are Available</span>
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
        <div className="bg-[#06C5E0] bg-opacity-50 text-center text-black mt-15 py-4">
          <p> &copy; 2025 All Rights Reserved By <b>{siteInfo?.name}</b></p>
        </div>
      </footer>
    </>
  )
}

export default Footer