import Link from 'next/link'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { IoCall } from 'react-icons/io5'
import SocialIcon from '../cards/SocialIcon'
import { getSiteInfo } from '@/lib/api/siteInfo.api'

export const ContactUs = async () => {
    const data = await getSiteInfo();
    const siteInfo = data?.websiteInfo;
    return (
        <>
            <section className='my-8 md:my-16'>
                <div className="container">
                    <div className="bg-[#f9f9f9] shadow-lg p-8 md:p-16 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="">
                                <span className="text-2xl md:text-3xl font-semibold mb-4 leading-10 block">Contact Info</span>
                                <span className="text-xl md:text-xl font-semibold mb-5 leading-1 text-slate-700 block">Book an Appointment with Dr. Pooja Mittal</span>
                                <span className="text-lg mb-1 text-black block">OPD Timings:</span>
                                <span className="text-sm mb-6 text-slate-800 block">Mon to Sat & 9:00 Am To 5:00 Pm</span>
                                <div className="flex flex-wrap justify-between">
                                    <div className='w-fit'>
                                        <div className="flex items-center gap-2 mb-6">
                                            <IoCall className="text-[#8a56f0] text-2xl" />
                                            <div>
                                                <span className='text-[10px] text-slate-600 block leading-1'> {`(Available 9 Am to 5 PM)`}</span>
                                                <Link href={`tel:${siteInfo?.primaryPhone}`} className='text-sm font-semibold leading-1' >{siteInfo?.primaryPhone} </Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <IoCall className="text-[#8a56f0] text-2xl" />
                                            <div>
                                                <span className='text-[10px] text-slate-600 block leading-1'> {`(Call Any Time (24x7))`}</span>
                                                <Link href={`tel:${siteInfo?.secondaryPhone}`} className='text-sm font-semibold leading-1' >{siteInfo?.secondaryPhone} </Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <IoCall className="text-[#8a56f0] text-2xl" />
                                            <div>
                                                <span className='text-[10px] text-slate-600 block leading-1'> {`(Hospital Call Centre)`}</span>
                                                <Link href={`tel:${siteInfo?.thirdPhone}`} className='text-sm font-semibold leading-1' >{siteInfo?.thirdPhone} </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mt-8">
                                            <SocialIcon siteInfo={siteInfo} />
                                        </div>
                                    </div>

                                    <div className="lg:w-[360px] lg:mt-0 mt-8 w-full">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.3324966721866!2d77.0406059!3d28.439391699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19111c7a9343%3A0xa1d041decea5baa0!2sDr.%20Pooja%20Mittal%20-%20Best%20Gynaecologist%2C%20Obstetrician%20and%20Laparoscopic%20surgeon%20%7C%20Medanta%20Hospitals%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1765817786416!5m2!1sen!2sin" className='w-full' height="190" allowfullscreen="" loading="lazy" ></iframe>
                                    </div>
                                </div>

                                 <div className="flex items-center gap-2 my-8">
                                            <HiOutlineMailOpen className="text-[#8a56f0] text-2xl" />
                                            <div>
                                                 <span className='text-[10px] text-slate-600 block leading-1'> {`Email:`}</span>
                                                <Link href={`mailto:${siteInfo?.primaryEmail}`} >{siteInfo?.primaryEmail}</Link>
                                            </div>
                                        </div>


                                {/* <p>Contact us for any queries or concerns—just give us a call or submit the form here.</p> */}
                                <div className="flex items-center gap-2 my-8">
                                    <FaLocationDot className="text-[#8a56f0] text-3xl" />
                                    <div className='leading-0'>
                                        <span className='text-[12px] mb-2 text-green-800 block leading-1'> {`Hospital Address:`}</span>
                                        <span className='leading-[1.15] block'>{siteInfo?.primaryAddress}</span>
                                    </div>
                                </div>
                                {
                                    siteInfo?.secondaryAddress && <div className="my-8">
                                        {/* <div className=" flex items-center gap-2"> */}
                                        {/* <FaLocationDot className="text-[#8a56f0] text-2xl" /> */}
                                        <span className='text-[16px] text-green-800 pl-8 block leading-1 mb-2.5'> {`Also available Mediclinic:`}</span>
                                        {/* </div> */}
                                        <div className='leading-0 block'>
                                            <p className='leading-0 flex gap-2 items-center text-lg'><FaLocationDot className="text-[#8a56f0] text-2xl" />{siteInfo?.secondaryAddress}</p>
                                            <p className='leading-0 flex gap-2 items-center text-lg'><FaLocationDot className="text-[#8a56f0] text-2xl" />{siteInfo?.thirdAddress}</p>
                                            <p className='leading-0 flex gap-2 items-center text-lg'><FaLocationDot className="text-[#8a56f0] text-2xl" />{siteInfo?.fourthAddress}</p>
                                            <p className='leading-0 flex gap-2 items-center text-lg'><FaLocationDot className="text-[#8a56f0] text-2xl" />Subhash Chowk Mediclinic, Gurugram</p>
                                        </div>
                                    </div>
                                }


                            </div>
                            <div>
                                <span className="text-2xl md:text-3xl font-semibold mb-4 leading-[40px] block">Contact Me</span>

                                <div className="grid gap-4 mt-3">
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="text" placeholder='Your Name' name="" id="" />
                                    </div>
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="text" placeholder='Your Phone' name="" id="" />
                                    </div>
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="email" placeholder='Your Email' name="" id="" />
                                    </div>
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="text" placeholder='Reason' name="reason" id="" />
                                    </div>
                                    <div className='col-span-full'>
                                        <textarea className='w-full border p-4 pl-7 rounded-2xl border-[#c8c8c8]' name="" id="" cols="30" rows="4" placeholder='Message...'></textarea>
                                    </div>
                                    <div>
                                        <button className='flex cursor-pointer gap-1.5 items-center bg-[#8a56f0] transition duration-300 hover:bg-green-500 text-white px-6 py-3 rounded-full font-semibold'>Send Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
