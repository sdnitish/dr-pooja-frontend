import React from 'react'
import { getServices } from "@/lib/api/services.api";
import ServiceCard from '../cards/ServiceCard';

const AllServices = async () => {
      const data = await getServices();
      const services = data?.data;
  return (
    <section className="services bg-[url('/img/bg.jpg')] bg-no-repeat bg-center bg-cover py-10 md:py-20">
        <div className="container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                {services.map((service , index) => (
                    <ServiceCard key={index} item={service} />
                ))}
            </div>
        </div>
    </section>
  )
}

export default AllServices