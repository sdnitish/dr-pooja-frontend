"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { TestimonialCard } from '../cards/TestimonialCard';

export const Testimonial = () => {
    const testimonialdata = [
        {
            image: "/img/test-img.png",
            name: "Richi Sharma",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },
        {
            image: "/img/test-img.png",
            name: "Richi Sharma",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },
        {
            image: "/img/test-img.png",
            name: "Richi Sharma",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },

    ]
    return (
        <>
            <section className="bg-[url('/img/pattern-4.webp')] bg-no-repeat bg-center py-10 md:py-20 text-center">
                <div className="container">
                    <div className="text-center">
                        <p className="text-3xl md:text-4xl font-semibold mb-4">What Our Patient Says</p>
                    </div>
                    <div className="md:mt-15 mt-5">
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
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000 }}
                                loop={true}
                            >

                                {
                                    testimonialdata.map((item, index) => (
                                        <SwiperSlide key={index} className='md:px-40 px-0'>
                                            <TestimonialCard item={item} />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
