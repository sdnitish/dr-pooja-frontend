import React from 'react'
import Navbar from './components/includes/Navbar'
import Footer from './components/includes/Footer'
import { getSiteInfo } from "@/lib/api/siteInfo.api";
import { getServices } from "@/lib/api/services.api";

const PageLayout = async ({ children }) => {
    const siteInfo = await getSiteInfo();
    const services = await getServices();
    return (
        <>
            <Navbar siteInfo={siteInfo?.websiteInfo} services={services?.data} />
            {children}
            <Footer services={services?.data} siteInfo={siteInfo?.websiteInfo} />
        </>
    )
}

export default PageLayout