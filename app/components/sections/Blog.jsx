'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import BlogCard from '../cards/BlogCard'

export default function Blog() {
    const carddata = [
        {
            image: "/img/blog.jpg",
            title: "Everyone realizes why a new common language would",
            slug: "slig-1",
        },
        {
            image: "/img/blog.jpg",
            title: "Everyone realizes why a new common language would",
            slug: "slig-1",
        },
        {
            image: "/img/blog.jpg",
            title: "Everyone realizes why a new common language would",
            slug: "slig-1",
        },
        {
            image: "/img/blog.jpg",
            title: "Everyone realizes why a new common language would",
            slug: "slig-1",
        },
    ]
    return (
        <>
            <section className=' my-4 md:my-[100px]'>
                <div className="container">
                    <div className='text-center'>
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Updates News</span>
                        <span className="text-2xl md:text-4xl font-semibold mb-4 leading-[40px] block">Latest Posts</span>
                    </div>
                    <div className="">
                        {

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                                navigation={{
                                    prevEl: ".prev-btn",
                                    nextEl: ".next-btn",
                                }}
                                // effect="fade"
                                fadeEffect={{ crossFade: true }}
                                speed={1200}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000 }}
                                loop={true}
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

                                {carddata.map((item, index) => (
                                    <SwiperSlide>
                                        <BlogCard key={index} item={item} />
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
