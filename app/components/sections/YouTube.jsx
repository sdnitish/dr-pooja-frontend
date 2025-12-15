"use client"
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { FaGooglePlay } from "react-icons/fa";

function YouTube({ siteInfo }) {

    const Youtubevideos = [
        {
            video: "https://www.youtube.com/embed/qumnIZ5IHIs?si=XleHgiidp0mnYAlu",
        },
        {
            video: "https://www.youtube.com/embed/Ai57c9QY2Ss?si=9EJNm5gFIjetCyT7",
        },
        {
            video: "https://www.youtube.com/embed/4amEqVeUmYE?si=MKup8GgJ7IjKKwJ3",
        },
        {
            video: "https://www.youtube.com/embed/4amEqVeUmYE?si=V9g7tO2WZn8F-XRA",
        },
        {
            video: "https://www.youtube.com/embed/7xQQ10zJTDg?si=M1dZgHGV9jrbUpJn",
        },
    ]

    return (
        <>
            <section className="services bg-[url('/img/bg-1.jpg')] bg-no-repeat bg-center bg-cover py-10 md:py-40">
                <div className="container ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="md:pr-20">
                            <div>
                                <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Medical &amp; General Care!</span>
                                <span className="text-2xl md:text-4xl font-semibold mb-4 leading-[40px] block">Surprise your body with extra care.</span>
                            </div>
                            <p>Your body works hard for you every day, and it deserves extra care and attention. In the rush of daily life, we often ignore small signs of tiredness, stress, and discomfort. Surprising your body with extra care means listening to its needs and making simple, healthy choices. Getting enough sleep, eating nutritious food, staying hydrated, and taking short breaks can greatly improve your overall well-being. Regular physical activity, even light exercise like walking or stretching, helps keep your body active and stress-free. Mental health is equally important, so practicing relaxation techniques such as deep breathing or meditation can calm your mind. Regular health check-ups also play a key role in early detection and prevention of health issues. When you give your body the care it deserves, you feel more energetic, balanced, and confident. Small daily efforts can lead to long-term health and a happier, healthier life.</p>
                            <div className="relative pl-18 mt-6">
                                <span className='absolute left-0 bg-[#8a56f0] text-white p-4 rounded-full text-2xl'><MdOutlineWifiCalling3 /></span>
                                <span className='block mb-0'>CALL ANYTIME 24/7</span>
                                <Link className='text-2xl text-[#8a56f0] font-bold' href={`tel:${siteInfo?.primaryPhone}`}>{siteInfo?.primaryPhone}</Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="border-9 border-white">
                                <div className="img">
                                    <img src="img/video.jpg" alt="Dr Pooja Mittal" />
                                </div>
                            </div>
                            <div className="you_tube absolute top-[50%] left-[50%] bg-[#8a56f0] rounded-full text-white text-2xl">
                                <Link className='p-13 block' href="https://www.youtube.com/watch?v=4amEqVeUmYE" target='_blank' rel='noopener noreferrer'>
                                    <FaGooglePlay />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services bg-[url('/img/bg.jpg')] bg-no-repeat bg-center bg-cover py-10 md:py-20">
                <div className="container">
                    {/* <div className="text-center">
                        <p className="text-3xl md:text-4xl font-semibold mb-4">Media</p>
                    </div> */}
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

                                {Youtubevideos.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="m-3">
                                            <iframe width="100%" height="315" src={item.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
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

export default YouTube
