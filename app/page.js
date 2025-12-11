import Image from "next/image";
import Hero from "./components/sections/Hero";
import HomeAbout from "./components/sections/HomeAbout";
import Services from "./components/sections/Services";
import Clients from "./components/sections/Clients";
import YouTube from "./components/sections/YouTube";
import Blog from "./components/sections/Blog";
import WhyChoose from "./components/sections/WhyChoose";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <Services />
      <WhyChoose />
      <YouTube />
      <Blog />
      <Clients />
    </>
  );
}
