import React from 'react'
import SocialIcon from '../cards/SocialIcon'
import Link from 'next/link'
import { HiChevronRight, HiOutlineMailOpen } from 'react-icons/hi'
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  const services = [
    {
      title: "Service ",
      slug: "service-name",
    },
    {
      title: "Service name",
      slug: "service-name",
    },
    {
      title: "Service name",
      slug: "service-name",
    },
    {
      title: "Service name",
      slug: "service-name",
    },
    {
      title: "Service name",
      slug: "service-name",
    },
    {
      title: "Service name",
      slug: "service-name",
    },
    {
      title: "Service name",
      slug: "service-name",
    },
    {
      title: "Service name",
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
              <SocialIcon />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-x-6 md:grid-cols-6 grid-cols-1 text-white">
            <div>
              <span className='block text-2xl font-bold relative mb-6 pb-2'>Quick Links</span>
              <ul className='md:flex flex-wrap gap-x-4'>
                {
                  services.map((item, index) => (
                    <li className='md:w-[47%]' key={index}><Link className='flex items-center gap-1 text-[16px] py-[3px]' href={`/services/${item.slug}`}><HiChevronRight /> {item.title}</Link></li>
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
                  <Link href={'/'} className="">example@domain.com</Link>
                </div>
              </div>
              <div className="flex items-center gap-2 my-4">
                <IoCall className="text-[#8a56f0] text-2xl" />
                <div>
                  <Link href={'/'} className="">+256 (3156) 2156 236</Link>
                </div>
              </div>
            </div>
            <div>
              <span className='block text-2xl font-bold relative mb-6 pb-2'>Contact Us</span>
              <p>Subscribe For Get Latest Updates</p>
              <div className="bg-white rounded-full mt-6 w-full max-w-md overflow-hidden flex p-1">
                <input className='w-full text-black p-3 outline-0' type="text" placeholder='Your Email*' name="" id="" />
                <button className='bg-[#8a56f0] rounded-full px-5 '>Subscribe </button>
              </div>
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