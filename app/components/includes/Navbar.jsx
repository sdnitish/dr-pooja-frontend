"use client";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import {
  FaPhoneAlt,
  FaSearch,
  FaRegCalendarAlt,
  FaBars,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import SocialIcon from "../cards/SocialIcon";

export default function Navbar({ siteInfo, services }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full bg-white shadow-sm py-1">
        <div className="container mx-auto flex md:justify-between justify-center items-center px-4">


          {/* INFO ITEMS (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-8 py-1">

            {/* Phone */}
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#8a56f0] text-2xl" />
              <div>
                <span className="block text-[10px] text-gray-500 mt-0.5 leading-1">Secretary 9 Am to 5 PM</span>
                <Link href={`tel:${siteInfo?.primaryPhone}`} className="font-semibold text-sm leading-1">{siteInfo?.primaryPhone}</Link>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 border-l pl-6">
              <FaPhoneAlt className="text-[#8a56f0] text-2xl" />
              <div>
                <span className="block text-[10px] text-gray-500 mt-0.5 leading-1">Call Any Time {`(24x7)`}</span>
                <Link href={`tel:${siteInfo?.secondaryPhone}`} className="font-semibold text-sm leading-1">{siteInfo?.secondaryPhone}</Link>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 border-l pl-6">
              <FaPhoneAlt className="text-[#8a56f0] text-2xl" />
              <div>
                <span className="block text-[10px] text-gray-500 mt-0.5 leading-1">Hospital Call Centre</span>
                <Link href={`tel:${siteInfo?.thirdPhone}`} className="font-semibold text-sm leading-1">{siteInfo?.thirdPhone}</Link>
              </div>
            </div>

          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4 text-black ">
            <div className="flex items-center gap-4">
              <SocialIcon siteInfo={siteInfo} />
            </div>
          </div>


        </div>
      </div>

      {/* MAIN MENU BAR */}
      <div className="w-full bg-black">
        <div className="container mx-auto flex justify-between items-center px-4">

          {/* LOGO */}
          <Link href="/">
            <img src={siteInfo?.logo} alt={siteInfo?.name} title={siteInfo?.name} className="max-h-18" />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">
            <li className="cursor-pointer hover:text-gray-100 py-6"><Link href="/">Home</Link></li>
            <li className="cursor-pointer hover:text-gray-100 py-6"><Link href="/about">About</Link></li>
            <li className="cursor-pointer hover:text-gray-100 py-6 relative group">
              <Link className="flex items-center gap-1.5" href="/service">Services <FaPlus className="text-sm" /></Link>
              <ul className="absolute top-full left-0 bg-white text-gray-800 shadow-lg max-h-[68vh] overflow-y-auto scale-y-0 origin-top group-hover:scale-y-100 transition duration-300 z-10">
                {services.map((service, index) => (
                  <li key={index} className=" hover:bg-gray-100 whitespace-nowrap border-b border-slate-200">
                    <Link className="px-4 py-1 block" href={`/service/${service.slug}`}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="cursor-pointer hover:text-gray-100 py-6"><Link href="/blog">Blogs</Link></li>
            <li className="cursor-pointer hover:text-gray-100 py-6"><Link href="/contact">Contact</Link></li>
          </ul>

            {/* Hamburger visible only on small screens */}
            <button
              aria-label="Open menu"
              className="md:hidden text-2xl text-white"
              onClick={() => setMobileOpen(true)}
            >
              <FaBars />
            </button>

          {/* Appointment Button (hidden on small screens) */}
          <Link href={'https://care.medanta.org/doctor/detail/b8ae36d3-380e-4c11-8222-6c2b9b207fcc'} target="_blank" className="hidden md:flex gap-1.5 items-center bg-[#8a56f0] transition duration-300 hover:bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
            APPOINTMENTS <FaRegCalendarAlt className="text-white text-sm" />
          </Link>
        </div>
      </div>

      {/* MOBILE OFF-CANVAS MENU + OVERLAY */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Drawer (slides left -> right) */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white z-50 transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/">
            <img src={siteInfo?.logo} alt={siteInfo?.name} title={siteInfo?.name} className="h-12" />
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="text-2xl text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="p-6">
          <ul className="flex flex-col gap-4 text-gray-800 font-medium">
            <li>
              <Link href="/" onClick={() => setMobileOpen(false)} className="block py-2">Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2">About</Link>
            </li>
            <li>
              <Link href="/service" onClick={() => setMobileOpen(false)} className="block py-2">Services</Link>
            </li>
            <li>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="block py-2">Blog</Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2">Contact</Link>
            </li>
          </ul>

          <div className="mt-6">
            <Link href="https://care.medanta.org/doctor/detail/b8ae36d3-380e-4c11-8222-6c2b9b207fcc" target="_blank" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 bg-[#8a56f0] transition duration-300 hover:bg-green-500 text-white px-4 py-2 rounded-full">
              APPOINTMENTS <FaRegCalendarAlt />
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 flex items-center gap-4 text-gray-600">
            <FaPhoneAlt className="text-[#8a56f0] text-3xl" />
            <div>
              <span className="block text-[10px] text-gray-500 mb-0">Secretary 9 Am to 5 PM</span>
              <Link href={`tel:${siteInfo?.primaryPhone}`} className="font-semibold">{siteInfo?.primaryPhone}</Link>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 flex items-center gap-4 text-gray-600">
            <FaPhoneAlt className="text-[#8a56f0] text-3xl" />
            <div>
              <span className="block text-[10px] text-gray-500 mb-0">Call Any Time {`(24x7)`}</span>
              <Link href={`tel:${siteInfo?.secondaryPhone}`} className="font-semibold">{siteInfo?.secondaryPhone}</Link>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 flex items-center gap-4 text-gray-600">
            <FaPhoneAlt className="text-[#8a56f0] text-3xl" />
            <div>
              <span className="block text-[10px] text-gray-500 mb-0">Hospital Call Centre</span>
              <Link href={`tel:${siteInfo?.thirdPhone}`} className="font-semibold">{siteInfo?.thirdPhone}</Link>
            </div>
          </div>

          <div className="mt-4 flex gap-4 text-gray-600">
            <SocialIcon siteInfo={siteInfo} />
          </div>
        </nav>
      </aside>
    </>
  );
}
