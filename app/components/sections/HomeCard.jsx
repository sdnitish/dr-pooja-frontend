import Link from 'next/link'
import React from 'react'
import { HiArrowRight } from 'react-icons/hi'

export const HomeCard = () => {
    return (
        <>
            <section className="home-card my-4 md:my-[60px]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white py-6 md:p-10 rounded shadow-lg text-center relative">
                            <img className=" absolute left-0 top-0" alt="" src="/img/shape-8.png" />
                            <img className=" absolute right-0 bottom-0" alt="" src="/img/shape-12.png" />
                            <img className="w-[80px] m-auto" alt="" src="/img/icon-1.png" />
                            <p className="text- [14px] my-2">Appointment With</p>
                            <h2 className="text-[18px] md:text-2xl font-semibold my-2 ">Nearest Clinic</h2>
                            <div className="">
                                <Link href={`/`} className='text-[#fff] bg-[#8956f0] p-3 rounded-full font-semibold mt-4 inline-block hover:bg-[#2ea358]'><HiArrowRight /></Link>
                            </div>
                        </div>
                        <div className="bg-white py-6 md:p-10 rounded shadow-lg text-center relative">
                            <img className=" absolute left-0 top-0" alt="" src="/img/shape-8.png" />
                            <img className=" absolute right-0 bottom-0" alt="" src="/img/shape-12.png" />
                            <img className="w-[80px] m-auto" alt="" src="/img/icon-2.png" />
                            <p className="text- [14px] my-2">Live Chat With</p>
                            <h2 className="text-[18px] md:text-2xl font-semibold my-2 ">Doctor</h2>
                            <div className="">
                                <Link href={`/`} className='text-[#fff] bg-[#8956f0] p-3 rounded-full font-semibold mt-4 inline-block hover:bg-[#2ea358]'><HiArrowRight /></Link>
                            </div>
                        </div>
                        <div className="bg-white py-6 md:p-10 rounded shadow-lg text-center relative">
                            <img className=" absolute left-0 top-0" alt="" src="/img/shape-8.png" />
                            <img className=" absolute right-0 bottom-0" alt="" src="/img/shape-12.png" />
                            <img className="w-[80px] m-auto" alt="" src="/img/icon-3.png" />
                            <p className="text- [14px] my-2">Appoinment With Top</p>
                            <h2 className="text-[18px] md:text-2xl font-semibold my-2 ">Departments</h2>
                            <div className="">
                                <Link href={`/`} className='text-[#fff] bg-[#8956f0] p-3 rounded-full font-semibold mt-4 inline-block hover:bg-[#2ea358]'><HiArrowRight /></Link>
                            </div>
                        </div>
                        <div className="bg-white py-6 md:p-10 rounded shadow-lg text-center relative">
                            <img className=" absolute left-0 top-0" alt="" src="/img/shape-8.png" />
                            <img className=" absolute right-0 bottom-0" alt="" src="/img/shape-12.png" />
                            <img className="w-[80px] m-auto" alt="" src="/img/icon-4.png" />
                            <p className="text- [14px] my-2">24/7 Active Support</p>
                            <h2 className="text-[18px] md:text-2xl font-semibold my-2 ">Help Support</h2>
                            <div className="">
                                <Link href={`/`} className='text-[#fff] bg-[#8956f0] p-3 rounded-full font-semibold mt-4 inline-block hover:bg-[#2ea358]'><HiArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
