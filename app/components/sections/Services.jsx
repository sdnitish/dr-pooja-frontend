'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import ServiceCard from '../cards/ServiceCard';

const Services = ({ services }) => {
    const carddata = [
        {
            image: "/img/img-1.jpg",
            title: "Hematology and Super Cool",
            slug: "slig-1",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },
        {
            image: "/img/img-1.jpg",
            title: "Hematology and Super Cool",
            slug: "slig-1",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },
        {
            image: "/img/img-1.jpg",
            title: "Hematology and Super Cool",
            slug: "slig-1",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },
        {
            image: "/img/img-1.jpg",
            title: "Hematology and Super Cool",
            slug: "slig-1",
            pera: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic, delectus, maxime exercitationem animi tempore suscipit ea earum alias fuga veniam dolor accusantium nisi eum architecto. Nulla ratione quod reiciendis!"
        },
    ]
    return (
        <>
            <section className="services bg-[url('/img/bg.jpg')] bg-no-repeat bg-center bg-cover py-10 md:py-20">
                <div className="container">
                    <div className="text-center">
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Medical & General Care!</span>
                        <p className="text-3xl md:text-4xl font-semibold mb-4">Our Services</p>
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
                                slidesPerView={3}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000 }}
                                loop={true}
                            >

                                { services.map((item, index) => (
                                    <SwiperSlide>
                                        <ServiceCard key={index} item={item} />
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