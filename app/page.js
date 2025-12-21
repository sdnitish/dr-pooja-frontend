import Image from "next/image";
import Hero from "./components/sections/Hero";
import HomeAbout from "./components/sections/HomeAbout";
import Services from "./components/sections/Services";
import Clients from "./components/sections/Clients";
import YouTube from "./components/sections/YouTube";
import Blog from "./components/sections/Blog";
import WhyChoose from "./components/sections/WhyChoose";
import { ContactUs } from "./components/sections/ContactUs";
import { HomeCard } from "./components/sections/HomeCard";
import { Testimonial } from "./components/sections/Testimonial";
import { BlogDetails } from "./components/sections/BlogDetails";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCard/>
      <HomeAbout />
      <Services />
      <WhyChoose />
      <YouTube />
      <Testimonial />
      <ContactUs />
      <Blog />
      <Clients />
      <BlogDetails />
    </>
  );
}
