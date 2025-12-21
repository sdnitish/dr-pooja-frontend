import React from 'react'
import { FaUser } from 'react-icons/fa'

export const BlogDetails = () => {
    return (
        <>
            <section className='mx-auto py-16'>
                <div className="container">
                    <div className="grid col-span-1 md:grid-cols-3 gap-4">
                        <div className="max-w-3xl col-span-2">
                            <span className="block text-2xl font-bold mb-2">Everyone realizes why a new common language would</span>
                            <span className='block mb-4 flex items-center gap-2'> <FaUser /> Richi Sharma</span>
                            <div className="relative">
                                <div className="absolute text-center px-3 py-2 z-10 top-4 left-4 bg-[#fff] w-[55px] border-t-2 border-[#8956f0] rounded-b-sm">
                                    <span className='block text-2xl font-bold'>23</span>
                                    jan 2025
                                </div>
                                <img src="/img/in-banner.jpeg" alt="Blog Sample" className="w-full h-auto mb-4" />
                            </div>
                            <p className="mb-4">This is where the blog details content will go. You can add text, images, and other media here to create a comprehensive blog post.</p>
                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="">
                            <div className="flex items-center gap-2 border-2 border-[#8956f050] rounded-md px-4 py-2 w-full max-w-md mb-5">
                                <input className='w-full outline-0' type="text" placeholder='Search' name="" id="" />
                                <button className='bg-[#8956f0] text-white px-4 py-2 ml-2 rounded-md'>Search</button>
                            </div>

                            <span className='block text-[20px] md:text-[27px] font-semibold my-7'>Recent Posts</span>
                            <div className="">
                                <div className="flex mb-4 gap-3 items-center my-2 border-b-1 border-[#8956f050] pb-2">
                                    <img className='w-[90px] h-[90px] object-cover' src="/img/in-banner.jpeg" alt="Recent Post 1" />
                                    <a href="#" className="block mb-2 text-[18px] font-semibold">Everyone realizes why a new common language would</a>
                                </div>
                                <div className="flex mb-4 gap-3 items-center my-2 border-b-1 border-[#8956f050] pb-2">
                                    <img className='w-[90px] h-[90px] object-cover' src="/img/in-banner.jpeg" alt="Recent Post 1" />
                                    <a href="#" className="block mb-2 text-[18px] font-semibold">How to Improve Your Blog Writing Skills</a>
                                </div>
                                <div className="flex mb-4 gap-3 items-center my-2 border-b-1 border-[#8956f050] pb-2">
                                    <img className='w-[90px] h-[90px] object-cover' src="/img/in-banner.jpeg" alt="Recent Post 1" />
                                    <a href="#" className="block mb-2 text-[18px] font-semibold">How to Improve Your Blog Writing Skills</a>
                                </div>
                            </div>
                            <span className='block text-[20px] md:text-[27px] font-semibold my-7'>Categories</span>
                            <ul>
                                <li className='list-disc m-4'><a href="#" className="block mb-2">How to Improve Your Blog Writing Skills</a></li>
                                <li className='list-disc m-4'><a href="#" className="block mb-2">Top 10 Tips for Bloggers</a></li>
                                <li className='list-disc m-4'><a href="#" className="block mb-2">The Art of Storytelling in Blogging</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
