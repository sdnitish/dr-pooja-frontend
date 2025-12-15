import React from 'react'

export default function WhyChoose() {
    return (
        <>
            <section className="services bg-[url('/img/pattern3-2.png')] bg-no-repeat bg-right py-10 md:py-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="md:pr-20">
                            <div>
                                <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Comprehensive Women’s Health Care</span>
                                <span className="text-2xl md:text-4xl font-semibold mb-4 leading-[40px] block">Why Choose Our Gynecology Services?</span>
                            </div>
                            <p>We provide compassionate, evidence-based gynecological and obstetric care using modern medical technology. Our focus is on safety, comfort, and personalized treatment for women at every stage of life.</p>
                            <ul>
                                <li className='relative pl-23 my-7'>
                                    <div className="absolute left-0 top-0 rounded-full p-5 bg-[#8a56f0]">
                                        <img className='w-[40px]' src="/img/health-screening.png" alt="" />
                                    </div>
                                    <span className='block text-[16px] md:text-[20px] mb-1 font-semibold text-[#8a56f0]'>High-Risk Pregnancy Care & Delivery</span>
                                    <p className='text-[14px]'>Specialized care for high-risk pregnancies with advanced monitoring, timely interventions, and expert support to ensure the best outcomes for both mother and baby.
</p>
                                </li>
                                <li className='relative pl-23 my-7'>
                                    <div className="absolute left-0 top-0 rounded-full p-5 bg-[#8a56f0]">
                                        <img className='w-[40px]' src="/img/health-screening.png" alt="" />
                                    </div>
                                    <span className='block text-[16px] md:text-[20px] mb-1 font-semibold text-[#8a56f0]'>Gynecological Laparoscopic Surgeries</span>
                                    <p className='text-[14px]'>Minimally invasive surgeries performed using laparoscopy, offering faster recovery, less pain, minimal scarring, and improved surgical precision.</p>
                                </li>
                                <li className='relative pl-23 my-7'>
                                    <div className="absolute left-0 top-0 rounded-full p-5 bg-[#8a56f0]">
                                        <img className='w-[40px]' src="/img/health-screening.png" alt="" />
                                    </div>
                                    <span className='block text-[16px] md:text-[20px] mb-1 font-semibold text-[#8a56f0]'>Hysteroscopic Surgeries</span>
                                    <p className='text-[14px]'>Advanced hysteroscopic procedures for diagnosing and treating uterine conditions such as fibroids, polyps, and abnormal bleeding without major surgery.</p>
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
