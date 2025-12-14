import React from 'react'

export default function HomeAbout() {
  return (
    <>
        <section className="home-about my-4 md:my-[80px]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                         <img src="/img/about.png" alt="About" />
                         <div className="absolute right-0 bottom-[17%] bg-[#8a56f0] py-3 px-6 text-center rounded-2xl">
                            <span className="block text-5xl md:text-6xl font-bold  text-white">+30</span>
                            <p className="text-white">Years of Experience</p>
                         </div>
                    </div>
                    <div>
                        <span className="text-base md:text-xl text-primary font-medium mb-2 block text-[#8a56f0]">About Me</span>
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">About Dr. Pooja Tiwari</h1>
                        <p className="mb-4">Dr. Pooja Tiwari is a renowned psychologist and therapist with over a decade of experience in helping individuals overcome mental health challenges. She specializes in cognitive-behavioral therapy and has a passion for empowering her clients to lead fulfilling lives.</p>
                        <p className="mb-4">With a compassionate approach and evidence-based techniques, Dr. Tiwari has successfully treated a wide range of issues including anxiety, depression, stress management, and relationship problems. Her dedication to her clients' well-being has earned her a reputation as one of the leading mental health professionals in the field.</p>
                        <p>Outside of her clinical practice, Dr. Tiwari is also an advocate for mental health awareness and regularly conducts workshops and seminars to educate the public on the importance of mental wellness.</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum minima velit culpa, fugiat adipisci, maxime eligendi possimus voluptas quod commodi consectetur qui at inventore nobis ducimus aliquid minus dolor doloribus.</p>
                        <div className='mt-5'>
                            <a href="/about" className="inline-block mt-4 px-8 py-3 bg-primary text-white font-medium rounded-full bg-[#8a56f0] hover:bg-[#2ea358] transition">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
