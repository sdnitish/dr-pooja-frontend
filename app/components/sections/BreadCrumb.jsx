import React from 'react'

export const BreadCrumb = ({name}) => {
    return (
        <>
            <div className="bg-[url('/img/in-banner.jpg')] bg-no-repeat bg-center bg-cover ">
                <div className="greadCrumb md:pl-[8%]">
                    <div className=" mx-auto  flex flex-col md:flex-row justify-between  md:pt-0 md:items-center ">
                        <div className='md:w-[75%] order-2 md:order-1 bg-[#7843e3] md:bg-transparent bg-opacity-50 md:bg-opacity-0 p-2 md:p-0'>
                            <h1 className="text-[20px] md:text-3xl font-bold text-white">{name || "Page"}</h1>
                            <div className="text-white mt-2 text-[16px]">
                                <a href="/" className="hover:underline">Home</a> &gt; <span>{name || "Page"}</span>
                            </div>
                        </div>
                        <div className='md:w-[25%] text-right order-1 md:order-2 '>
                            <img className='md:w-auto w-[200px] m-auto' src="/img/in-banner-img.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
