import React from 'react'
import { BreadCrumb } from '../components/sections/BreadCrumb'

export default function page() {
    return (
        <>
            <BreadCrumb  />
            <section>
                <div className="container">
                    <div className=''>
                         <img src="/img/ab-2.png" alt="About" />
                    </div>
                    <div className="my-10 md:my-20">
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">About Us</span>
                         <p className="text-3xl md:text-4xl font-semibold mb-4"> Welcome to Our Company</p>
                        <p className="">
                            Welcome to Our Company! We are dedicated to providing top-notch services and solutions to our clients. Our team of experts works tirelessly to ensure that we meet and exceed your expectations. With a focus on innovation, quality, and customer satisfaction, we strive to be the best in the industry. Thank you for choosing us as your trusted partner.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
