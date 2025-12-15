import Link from 'next/link';
import React from 'react'
import { HiArrowRight } from 'react-icons/hi';


const ServiceCard = ({ item }) => {

    return (
        <>
            <div className="border-2 bg-white bg-fixed border-[#8956f050] p-4 rounded-lg  m-4 mb-6 pb-9 relative hover:border-[#8956f0] hover:shadow-lg transition-all duration-300">
                <Link href={`/service/${item.slug}`} className="img">
                    <img className='w-full rounded-xl' src={item.image??'/img/serv.jpeg'} alt="About" />
                </Link>
                <div className="px-6">
                    <Link href={`/service/${item.slug}`}>
                        <span className='text-[16px] md:text-[19px] line-clamp-1! font-semibold text-[#8956f0] block my-3'>{item.name}</span>
                    </Link>
                    <div className="pera line-clamp-4">
                        <p className='text-[#888c92]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!</p>
                    </div>
                    <div className="">
                        <Link href={`/service/${item.slug}`} className='text-white bg-[#8956f0] p-3 rounded-full absolute bottom-[-20px] left-[45%] font-semibold mt-4 inline-block hover:bg-[#2ea358]'><HiArrowRight /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceCard