import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

export default function BlogCard({ item }) {
    return (
        <>
            <div className="border-2 bg-white bg-fixed border-[#8956f050] rounded-lg m-4 mb-6 relative hover:border-[#8956f0] hover:shadow-lg transition-all duration-300">
                <div className="img">
                    <div className="absolute text-center px-3 py-2 z-10 top-6 right-6 bg-[#fff] w-[55px] border-t-2 border-[#8956f0] rounded-b-sm">
                        <span className='block text-2xl font-bold'>23</span>
                        jan 2025
                    </div>
                    <img className='w-full rounded-xl' src={item.image} alt="About" />
                </div>
                <div className="p-8">
                    <span className='flex items-center gap-2 text-[#838383]'> <FaUser />Dr Pooja Mittal</span>
                    <Link href={`/`}>
                        <span className='text-xl font-semibold text-[#000] block my-4'>{item.title}</span>
                    </Link>
                    <div className="pera">
                        <p className='text-[#888c92]'>{item.pera}</p>
                    </div>
                    <div className="">
                        <Link href={`/`} className='text-[#8956f0] font-semibold mt-4 hover:text-[#2ea358] flex items-center gap-2'>Read More<HiArrowRight /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
