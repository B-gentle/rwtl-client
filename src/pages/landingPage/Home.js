import React from 'react'
import Contact from './contact/Contact'
import Footer from './footer/Footer'
import Hero from './hero/Hero'
import HowItWorks from './howItWorks/HowItWorks'
import Navbar from './navbar/Navbar'

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Hero />
        <HowItWorks />
        <Contact />
        <Footer />
        </div>
  )
}

export default Home