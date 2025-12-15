import React from 'react'

export default function HomeAbout() {
  return (
    <>
        <section className="home-about my-4 md:my-[80px]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                         <img src="/img/about.png" alt="About" />
                         <div className="absolute right-0 bottom-[5%] md:bottom-[17%] bg-[#8a56f0] py-3 px-4 md:px-6 text-center rounded-2xl">
                            <span className="block text-4xl md:text-6xl font-bold  text-white">20+</span>
                            <p className="text-white">Years of Experience</p>
                         </div>
                    </div>
                    <div>
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Dr Pooja Mittal</span>
                        <h1 className="text-2xl md:text-3xl font-semibold mb-4">MBBS, MD (Obstetrics and Gynaecology)</h1>
                        <span className='block text-xl my-1'>FMAS ( Fellowship in Minimal Access Surgery)</span>
                        <span className='block my-1'><b>Registration No.</b> HMC 7323</span>
                        <span className='block text-1xl font-semibold my-2'>Presently working at Medanta, The Medicity, Gurgaon </span>
                        <p className="mb-4">Dr Pooja Mittal is a one of the finest and most sought after Obstetrician and Gynecologist in Delhi-NCR. With over 20 years of dedicated experience,  Dr Mittal is  renowned for her extensive experience in managing high risk pregnancies and performing complex gynecological surgeries such as advanced Laparoscopic surgeries, Hysteroscopies, surgeries for female genital prolapse, fibroids , endometriosis and ovarian cysts. Her services also include menopausal health, adolescent problems and fertility issues. </p>

                        <p className="mb-4">At present , Dr Pooja Mittal is working as a senior consultant at Medanta, The Medicity, Gurgaon. </p>
{/* 
                        <div className='mt-5'>
                            <a href="/about" className="inline-block mt-4 px-8 py-3 bg-primary text-white font-medium rounded-full bg-[#8a56f0] hover:bg-[#2ea358] transition">Read More</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
