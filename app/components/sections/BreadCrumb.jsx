import React from 'react'

export const BreadCrumb = ({name}) => {
    return (
        <>
            <div className="bg-[url('/img/in-banner.jpeg')] bg-no-repeat bg-center bg-cover ">
                <div className="bg-[#000000b2] py-10 md:py-30 text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-[20px] md:text-4xl font-bold text-white">{name || "Page"}</h1>
                        <div className="text-white mt-2 text-xl">
                            <a href="/" className="hover:underline">Home</a> &gt; <span>{name || "Page"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
