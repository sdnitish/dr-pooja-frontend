import Link from 'next/link';
import React from 'react'
import { HiArrowRight } from 'react-icons/hi';


const ServiceCard = ({ item }) => {

    return (
        <>
            <div className="border-2 bg-white bg-fixed border-[#8956f050] p-4 rounded-lg  m-4 mb-6 pb-9 relative hover:border-[#8956f0] hover:shadow-lg transition-all duration-300">
                <div className="img">
                    <img className='w-full rounded-xl' src={item.image} alt="About" />
                </div>
                <div className="px-6">
                    <Link href={`/`}>
                        <span className='text-[17px] md:text-[23px] font-semibold text-[#8956f0] block my-3'>{item.title}</span>
                    </Link>
                    <div className="pera line-clamp-4">
                        <p className='text-[#888c92]'>{item.pera}</p>
                    </div>
                    <div className="">
                        <Link href={`/`} className='text-[#fff] bg-[#8956f0] p-3 rounded-full absolute bottom-[-20px] left-[45%] font-semibold mt-4 inline-block hover:bg-[#2ea358]'><HiArrowRight /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceCard