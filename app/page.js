import Image from "next/image";
import Hero from "./components/sections/Hero";
import Navbar from "./components/includes/Navbar";
import Footer from "./components/includes/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
