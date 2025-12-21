import Navbar from "./components/includes/Navbar";
import Hero from "./components/sections/Hero";
import HomeAbout from "./components/sections/HomeAbout";
import Services from "./components/sections/Services";
import Clients from "./components/sections/Clients";
import YouTube from "./components/sections/YouTube";
import Blog from "./components/sections/Blog";
import WhyChoose from "./components/sections/WhyChoose";
import Footer from "./components/includes/Footer";
import { ContactUs } from "./components/sections/ContactUs";
import { getSiteInfo } from "@/lib/api/siteInfo.api";
import { getServices } from "@/lib/api/services.api";
import PageLayout from "./PageLayout";
import { HomeCard } from "./components/sections/HomeCard";
import { Testimonial } from "./components/sections/Testimonial";

export const metadata = {
  title: "Dr. Pooja Mittal - Home",
  description: "Welcome to Dr. Pooja Mittal's official website. Explore our services, read our blog, and get in touch for appointments.",
};

export default async function Home() {
  const siteInfo = await getSiteInfo();
  const services = await getServices();
  return (
    <>
      <PageLayout>
        <Hero />
        <HomeCard />
        <HomeAbout />
        <Services services={services?.data} />
        <WhyChoose />
        <YouTube siteInfo={siteInfo?.websiteInfo} />
        <Testimonial />
        <ContactUs />
        <Blog />
        <Clients />
      </PageLayout>
    </>
  );
}
