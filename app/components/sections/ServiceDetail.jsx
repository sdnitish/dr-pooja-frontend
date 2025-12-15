import React from 'react'
import { getServiceBySlug } from '@/lib/api/services.api'
import { BreadCrumb } from './BreadCrumb';

const ServiceDetail = async ({ slug }) => {
    const data = await getServiceBySlug(slug);
    const services = data?.service;
    // console.log("service data", services);
    return (
        <>
        <BreadCrumb name={services?.name} />
        <section className=' my-4 md:my-[80px]'>
            <div className="container">
                <div className='grid md:grid-cols-2 gap-10'>
                    <div className=''>
                        <img className='w-full' src="/img/serv.jpeg" alt="About" />
                    </div>
                    <div>
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">Service Detail</span>
                        <h1 className="text-2xl md:text-3xl font-semibold mb-4">{services?.name}</h1>
                        <span className='block text-xl my-1'>FMAS ( Fellowship in Minimal Access Surgery)</span>
                        <span className='block my-1'><b>Registration No.</b> HMC 7323</span>
                        <span className='block text-1xl font-semibold my-2'>Presently working at Medanta, The Medicity, Gurgaon </span>
                        <p className="mb-4">Dr. Pooja Mittal is a one of the finest and most sought after Obstetrician and Gynecologist in Delhi-NCR. With over 20 years of dedicated experience,  Dr Mittal is  renowned for her extensive experience in managing high risk pregnancies and performing complex gynecological surgeries such as advanced Laparoscopic surgeries, Hysteroscopies, surgeries for female genital prolapse, fibroids , endometriosis and ovarian cysts. Her services also include menopausal health, adolescent problems and fertility issues. </p>

                        <p className="mb-4">At present , Dr. Pooja Mittal is working as a senior consultant at Medanta, The Medicity, Gurgaon. </p>

                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ServiceDetail