'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import ServiceCard from '../cards/ServiceCard';

const Services = ({ services }) => {
    return (
        <>
            <section className="services bg-[url('/img/bg.jpg')] bg-no-repeat bg-center bg-cover py-10 md:py-20">
                <div className="container">
                    <div className="text-center">
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Medical & General Care!</span>
                        <p className="text-2xl md:text-4xl font-semibold mb-4">Our Services</p>
                    </div>
                    <div className="">
                        {
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation={{
                                    prevEl: ".prev-btn",
                                    nextEl: ".next-btn",
                                }}
                                speed={1200}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                loop={true}
                                spaceBetween={20}

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                    },
                                }}
                            >
                                {services.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <ServiceCard item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services