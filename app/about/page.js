import React from 'react'
import { BreadCrumb } from '../components/sections/BreadCrumb'
import PageLayout from '../PageLayout'

export default function page() {
    return (
        <PageLayout>
            <BreadCrumb name={"About us"} />
            <section className=' my-4 md:my-[80px]'>
                <div className="container">
                    <div className='grid md:grid-cols-2 gap-10'>
                        <div className=''>
                            <img src="/img/ab-2.png" alt="About" />
                        </div>
                        <div>
                            <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Dr Pooja Mittal</span>
                            <h1 className="text-2xl md:text-3xl font-semibold mb-4">MBBS, MD (Obstetrics and Gynaecology)</h1>
                            <span className='block text-xl my-1'>FMAS ( Fellowship in Minimal Access Surgery)</span>
                            <span className='block my-1'><b>Registration No.</b> HMC 7323</span>
                            <span className='block text-1xl font-semibold my-2'>Presently working at Medanta, The Medicity, Gurgaon </span>
                            <p className="mb-4">Dr Pooja Mittal is a one of the finest and most sought after Obstetrician and Gynecologist in Delhi-NCR. With over 20 years of dedicated experience,  Dr Mittal is  renowned for her extensive experience in managing high risk pregnancies and performing complex gynecological surgeries such as advanced Laparoscopic surgeries, Hysteroscopies, surgeries for female genital prolapse, fibroids , endometriosis and ovarian cysts. Her services also include menopausal health, adolescent problems and fertility issues. </p>

                            <p className="mb-4">At present , Dr Pooja Mittal is working as a senior consultant at Medanta, The Medicity, Gurgaon. </p>

                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}
