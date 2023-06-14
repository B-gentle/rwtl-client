import React, { useRef } from 'react';
import Navbar from '../navbar/Navbar';
import './about.scss';
import heroImage from '../../../assets/images/about-hero.png';
import award from '../../../assets/images/medal-star.svg';
import roy from '../../../assets/images/roy.png';
import ekwekwe from '../../../assets/images/ekwekwe.png';
import Footer from '../footer/Footer';
import { Carousel } from 'antd';
import TeamSlide from './TeamSlide';

const About = () => {

    const carouselRef = useRef(null);

    const handleNext = () => {
        carouselRef.current.next();
    };

    const handlePrevious = () => {
        carouselRef.current.prev();
    };

    return (
        <div className='about'>
            <Navbar />
            <div className='hero'>
                <div>
                    <div className='about-medal'>
                        <img src={award} alt='' />
                        <span>About Us</span>
                        </div>
                    <h1>Get to know us</h1>
                    <p>
                        We contribute our unique expertise to ensure the platform's growth, user satisfaction, and financial empowerment for all its users.
                    </p>
                </div>
                <div>
                <img src={heroImage} alt='' />
                </div>
                
            </div>
            <div className='mission'>
                <h3>Our Mission</h3>
                <p>
                    <span>Recharge Wise Technologies Limited is an ICT solutions firm that is dedicated to providing products and services to meet the demand of today's people, using cutting edge technology to enhance the ease with which they can navigate the GSM landscape. Recharge Wise Technologies, is registered with the Corporate Affairs Commission (CAC) RC Number: 6953827 to carry out Telecoms-related Businesses.</span>
                    <span>
                    Our goal is to transformed the way individuals manage their finances by offering a unique commission-based system. By combining the convenience of mobile recharging, bill payments, and a lucrative referral program, Recharge Wise Technology provides users with an opportunity to earn commissions on their transactions while also empowering them to refer friends and family to the platform. With a user-friendly interface and a wide range of services, our platform simplifies financial management while enhancing earning potential.
                    </span>
                    </p>
            </div>
            <div className='team'>
                <h1>
                    <img src={award} alt=''/>
                <p>Our Team</p>
                </h1>
                <h2>Heads of Administration</h2>
                <div className='slide-div'>
                    <Carousel
                    ref={carouselRef}
                    dots={false}
                    >
                        <TeamSlide 
                        name="Roy Udobata Chukwu" 
                        title="Director of operations" 
                        text="Meet a distinguished individual who holds a degree from the University of Jos. With an impressive track record of 15 years in network marketing, he has honed his expertise and become a certified professional speaker and trainer.
                        Having served as a top leader in previous MLM companies, he successfully contributed to the elevation of numerous individuals, transforming them into accomplished millionaires. Additionally, he holds the esteemed position of Chairman of the De Great Men Club, an organization dedicated to empowering the less privileged, widows, and young entrepreneurs.
                        He also serves as the Chairman and CEO of MALITEE INTEGRATED SERVICES, where he continues to make a significant impact. He believes that the journey is just as important as the destination and acknowledges that not all kings are equal. Embracing the concept of 'Higher is here,' he understands the limitless potential that lies ahead.
                        Operating on a global scale, he envisions the world as his stage, ready to showcase remarkable achievements. Together, let's embark on this journey to make money and create success." 
                        img={roy} handleNext={handleNext} handlePrevious={handlePrevious} />
                         <TeamSlide 
                        name="Ekekwe John Otuto" 
                        title="Director of Marketing" 
                        text="Meet John, a remarkable individual who embodies the qualities of a successful entrepreneur, a success strategist, and a business coach. Not only is he a top earner and leader in the MLM industry, but he is also the CEO of De-Catalyst Telecom Consults and a former Estate Manager.
                        With over 7 years of experience in Network Marketing, John has established himself as a knowledgeable and influential figure. He holds a degree from the University of Portharcourt and is a student member of ICAN (Institute of Chartered Accountants of Nigeria).
                        In just 3 years, John accomplished an extraordinary feat by building a team of over 2 million people in his previous company. His expertise has extended beyond local borders, as he has mentored numerous individuals in the industry both locally and internationally.
                        John's passion lies in helping others achieve financial freedom and live their desired lifestyle. He firmly believes that if you spend money daily, you must also find a way to make money daily." img={ekwekwe} handleNext={handleNext} handlePrevious={handlePrevious} />
                    </Carousel>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About