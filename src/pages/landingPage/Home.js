import React from 'react'
import Contact from './contact/Contact'
import Footer from './footer/Footer'
import Hero from './hero/Hero'
import HowItWorks from './howItWorks/HowItWorks'
import Navbar from './navbar/Navbar'
import Services from './services/Services'

const Home = () => {
  return (
    <div className='home'>
      <p className='text-right p-[1rem] bg-[#E9daa4] text-[#050301]'>RC6953827</p>
        <Navbar/>
        <Hero />
        <HowItWorks />
        <Services />
        <Contact />
        <Footer />
        </div>
  )
}

export default Home