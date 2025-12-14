import Link from 'next/link'
import React from 'react'
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { FaGooglePlay } from "react-icons/fa";

function YouTube() {
    return (
        <>
            <section className="services bg-[url('/img/bg-1.jpg')] bg-no-repeat bg-center bg-cover py-10 md:py-40">
                <div className="container ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="md:pr-20">
                            <div>
                                <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Medical &amp; General Care!</span>
                                <span className="text-3xl md:text-4xl font-semibold mb-4 leading-[40px] block">Surprise your body with extra care.</span>
                            </div>
                            <p>Rapidiously evisculate user-centric functionalities for highly efficient interfaces. Competently leverage other's scalable technology before synergistic manufactured products.</p>
                            <div className="relative pl-18 mt-6">
                                <span className='absolute left-0 bg-[#8a56f0] text-white p-4 rounded-full text-2xl'><MdOutlineWifiCalling3 /></span>
                                <span className='block mb-3'>CALL ANYTIME 24/7</span>
                                <Link className='text-2xl text-[#8a56f0] font-bold' href={`/`}>+44-1234-5996</Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="border-9 border-white">
                                <div className="img">
                                    <img src="img/about-4-1.jpg" alt="" />
                                </div>
                            </div>
                            <div className="you_tube absolute top-[50%] left-[50%] bg-[#8a56f0] rounded-full text-white text-2xl">
                                <Link className='p-13 block' href={`/`}>
                                    <FaGooglePlay />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default YouTube
