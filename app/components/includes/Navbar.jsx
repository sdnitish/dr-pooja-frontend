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
} from "react-icons/fa";
import SocialIcon from "../cards/SocialIcon";

export default function Navbar({ siteInfo , services}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full bg-white shadow-sm py-1">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">

          {/* LOGO */}
          <div className="flex items-center gap-4">
            {/* Hamburger visible only on small screens */}
            <button
              aria-label="Open menu"
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setMobileOpen(true)}
            >
              <FaBars />
            </button>

            <Link href="/">
              <img src={siteInfo?.logo} alt={siteInfo?.name} title={siteInfo?.name} className="max-h-20" />
            </Link>
          </div>

          {/* INFO ITEMS (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-8">

            {/* Phone */}
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#8a56f0] text-3xl" />
              <div>
                <span className="block text-[10px] text-gray-500 mb-0">Call Any Time</span>
                <Link href={`tel:${siteInfo?.primaryPhone}`} className="font-semibold">{siteInfo?.primaryPhone}</Link>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 border-l pl-6">
              <HiOutlineMailOpen className="text-[#8a56f0] text-4xl" />
              <div>
                <span className="block text-[10px] text-gray-500 mb-0">Email</span>
                <Link href={`mailto:${siteInfo?.primaryEmail}`} className="font-semibold">{siteInfo?.primaryEmail}</Link>
              </div>
            </div>

          </div>

          {/* Appointment Button (hidden on small screens) */}
          <Link href={'/'} className="hidden md:flex gap-1.5 items-center bg-[#8a56f0] text-white px-6 py-3 rounded-full font-semibold">
            APPOINTMENTS <FaRegCalendarAlt className="text-white text-sm" />
          </Link>
        </div>
      </div>

      {/* MAIN MENU BAR */}
      <div className="w-full bg-[#06C5E0] ">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">
            <li className="cursor-pointer hover:text-gray-100 py-4"><Link href="/">Home</Link></li>
            <li className="cursor-pointer hover:text-gray-100 py-4"><Link href="/about">About</Link></li>
            <li className="cursor-pointer hover:text-gray-100 py-4 relative group">
              <Link href="/service">Service</Link>
              <ul className="absolute top-full left-0 bg-white text-gray-800 shadow-lg max-h-[68vh] overflow-y-auto scale-y-0 origin-top group-hover:scale-y-100 transition duration-300 z-10">
                {services.map((service, index) => (
                  <li key={index} className=" hover:bg-gray-100 whitespace-nowrap border-b border-slate-200">
                    <Link className="px-4 py-1 block" href={`/service/${service.slug}`}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="cursor-pointer hover:text-gray-100 py-4"><Link href="/blog">Blog</Link></li>
            <li className="cursor-pointer hover:text-gray-100 py-4"><Link href="/contact">Contact</Link></li>
          </ul>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4 text-white">
            {/* Search icon hidden on very small screens (optional) */}
            {/* <div className="hidden sm:flex items-center">
              <div className="bg-white text-[#8a56f0] p-2 rounded-full cursor-pointer shadow">
                <FaSearch />
              </div>
            </div> */}

            <div className="hidden md:flex items-center gap-4">
               <SocialIcon siteInfo={siteInfo} />
            </div>
          </div>
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
            <Link href="/" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 bg-[#8a56f0] text-white px-4 py-2 rounded-full">
              APPOINTMENTS <FaRegCalendarAlt />
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 flex items-center gap-4 text-gray-600">
            <FaPhoneAlt className="text-xl text-[#8a56f0]" />
            <div>
              <p className="text-xs text-gray-500">Call Any Time</p>
              <Link href={`tel:${siteInfo?.primaryPhone}`} className="font-semibold">{siteInfo?.primaryPhone}</Link>
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
