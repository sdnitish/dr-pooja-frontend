'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';

const Clients = () => {
    const carddata = [
        {
            image: "/img/brand-1-1.svg",

        },
        {
            image: "/img/brand-1-2.svg",

        },
        {
            image: "/img/brand-1-3.svg",

        },
        {
            image: "/img/brand-1-4.svg",
        },
        {
            image: "/img/brand-1-5.svg",
        },
        {
            image: "/img/brand-1-2.svg",

        },
        {
            image: "/img/brand-1-3.svg",

        },
        {
            image: "/img/brand-1-4.svg",
        }
    ]
    return (
        <>
            <section className="clients my-4 md:my-[100px]">
                <div className="container">
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
                                slidesPerView={5}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 2000 }}
                                loop={true}
                            >

                                {carddata.map((item, index) => (
                                    <SwiperSlide>
                                        <div className="mx-5" key={index}>
                                            <img src={item.image} alt="" />
                                        </div>
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

export default Clients