import React from 'react'

export default function WhyChoose() {
    return (
        <>
            <section className="services bg-[url('/img/pattern3-2.png')] bg-no-repeat bg-right py-10 md:py-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="md:pr-20">
                            <div>
                                <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Medical & General Care!s</span>
                                <span className="text-3xl md:text-4xl font-semibold mb-4 leading-[40px] block">Why choose health
                                    Care Clinic?</span>
                            </div>
                            <p>Rapidiously evisculate user-centric functionalities for highly efficient interfaces. Competently leverage other's scalable technology before synergistic manufactured products.</p>
                            <ul>
                                <li className='relative pl-23 my-7'>
                                    <div className="absolute left-0 top-0 rounded-full p-5 bg-[#8a56f0]">
                                        <img className='w-[40px]' src="/img/health-screening.png" alt="" />
                                    </div>
                                    <span className='block text-2xl mb-1 font-semibold text-[#8a56f0]'>Health Screening</span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </li>
                                <li className='relative pl-23 my-7'>
                                    <div className="absolute left-0 top-0 rounded-full p-5 bg-[#8a56f0]">
                                        <img className='w-[40px]' src="/img/health-screening.png" alt="" />
                                    </div>
                                    <span className='block text-2xl mb-1 font-semibold text-[#8a56f0]'>Emergency Service</span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </li>
                                <li className='relative pl-23 my-7'>
                                    <div className="absolute left-0 top-0 rounded-full p-5 bg-[#8a56f0]">
                                        <img className='w-[40px]' src="/img/health-screening.png" alt="" />
                                    </div>
                                    <span className='block text-2xl mb-1 font-semibold text-[#8a56f0]'>Lab Test</span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="">
                                <img src="img/choose.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
