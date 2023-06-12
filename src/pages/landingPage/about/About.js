import React from 'react';
import Navbar from '../navbar/Navbar';
import './about.scss';
import heroImage from '../../../assets/images/about-hero.png'

const About = () => {
    return (
        <div className='about'>
            <Navbar />
            <div className='hero'>
                <div>
                    <div>About Us</div>
                    <span>Get to know us</span>
                    <p>
                        We contribute our unique expertise to ensure the platform's growth, user satisfaction, and financial empowerment for all its users.
                    </p>
                </div>
                <img src={heroImage} alt='' />
            </div>
        </div>
    )
}

export default About