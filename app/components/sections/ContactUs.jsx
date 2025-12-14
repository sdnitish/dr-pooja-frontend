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
                                <span className="text-2xl md:text-3xl font-semibold mb-4 leading-[40px] block">Have Any Queries?</span>
                                <p>Contact us for any queries or concerns—just give us a call or submit the form here.”</p>
                                <div className="flex items-center gap-2 my-8">
                                    <FaLocationDot className="text-[#8a56f0] text-2xl" />
                                    <div>
                                        <p>{siteInfo?.primaryAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 my-8">
                                    <HiOutlineMailOpen className="text-[#8a56f0] text-2xl" />
                                    <div>
                                        <Link href={`mailto:${siteInfo?.primaryEmail}`} >{siteInfo?.primaryEmail}</Link>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 my-8">
                                    <IoCall className="text-[#8a56f0] text-2xl" />
                                    <div>
                                        <Link href={`tel:${siteInfo?.primaryPhone}`} >{siteInfo?.primaryPhone}</Link>
                                    </div>
                                </div>

                                  <div className="flex items-center gap-4 mt-12">
                                                 <SocialIcon siteInfo={siteInfo} />
                                              </div>
                            </div>
                            <div>
                                <span className="text-2xl md:text-3xl font-semibold mb-4 leading-[40px] block">Contact Me</span>
                                <p>Fields marked with an * are required</p>

                                <div className="grid md:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="text" placeholder='Your Name' name="" id="" />
                                    </div>
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="email" placeholder='Your Email' name="" id="" />
                                    </div>
                                    <div>
                                        <input className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' type="text" placeholder='Your Phone' name="" id="" />
                                    </div>
                                    <div>
                                        <select className='w-full border p-4 pl-5 rounded-full border-[#c8c8c8]' name="" id="">
                                            <option value="">Select</option>
                                            <option value="">High-risk pregnancy care & delivery</option>
                                            <option value="">Hysteroscopic Surgeries</option>
                                            <option value="">Menopausal problems</option>
                                            <option value="">PCOS management</option>
                                            <option value="">Subfertility & Infertility</option>
                                            <option value="">Cervical cancer screening and Vaccination</option>
                                        </select>
                                    </div>
                                    <div className='col-span-full'>
                                        <textarea className='w-full border p-4 pl-7 rounded-2xl border-[#c8c8c8]' name="" id="" cols="30" rows="4" placeholder='Message...'></textarea>
                                    </div>
                                    <div>
                                        <button className='flex gap-1.5 items-center bg-[#8a56f0] text-white px-6 py-3 rounded-full font-semibold'>Send Message</button>
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
