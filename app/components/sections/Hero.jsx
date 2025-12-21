import Link from 'next/link';
import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      <div className="bg-[url('/img/banner1.jpg')] bg-no-repeat bg-center bg-cover ">
        <div className="pl-0 md:pl-[6%] pt-10 md:pt-20 pt-10 md:pt-20 bg-[#0000008c]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="p-4 text-[#ffffff] w-full md:w-[55%]">
              <h1 className="text-2xl md:text-[90px] font-bold">Dr. Pooja Mittal</h1>
              <p className="text-lg md:text-4xl mb-6 font-semibold">(Senior Consultant)</p>
              <p className="text-lg md:text-2xl">Obstetrics & Gynaecology</p>
              <p className="text-lg mb-6">Fellowship in Minimal Access Surgery ( FMAS) , MD Obstetrics & Gynae , M.B.B.S</p>
              <Link href={`/`} className='flex items-center gap-2 text-2xl md:text-4xl font-bold'> <FaWhatsapp  className='text-2xl md:text-[70px]' /> +90 456 789 758</Link>
            </div>
            <div className="w-full md:w-[45%] relative">
              <img src="/img/in-banner-img.png" alt="Banner" className="w-full h-auto rounded-lg shadow-lg relative z-[1]" />
              <div className="absolute top-0 left-0 w-full h-full bg-[#dededed0] border-5 border-[#ffffffd2] rounded-[50%]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero