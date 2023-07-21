import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { motion } from 'framer-motion';
import './howItWorks.scss';
import { ComplanSlide, ServiceProviders } from './BluePrint';
import MTN from '../../../assets/images/MTN.svg';
import AIRTEL from '../../../assets/images/airtel.svg';
import nineMobile from '../../../assets/images/9mobile.svg';
import glo from '../../../assets/images/Glo.svg';
import cableTv from '../../../assets/images/cableTv.jpeg';
import gotv from '../../../assets/images/GOTV.png';
import ekdc from '../../../assets/images/electricity.png';
import eedc from '../../../assets/images/eedc.png';
import exams from '../../../assets/images/exams.webp'
import north from '../../../assets/images/Benin-Port-Harcourt-Kano-and-Kaduna-DisCos-cc.png';
import aedc from '../../../assets/images/AEDC-BRAND.jpg'
import slide1 from '../../../assets/images/slide1Image.png';
import slide2 from '../../../assets/images/slide2Image.png';
import slide3 from '../../../assets/images/slide3Image.png';
import slide4 from '../../../assets/images/slide4Image.png';
import slide5 from '../../../assets/images/slide5Image.png';


const HowItWorks = () => {
    const carouselRef = useRef(null);

    const handleNext = () => {
        carouselRef.current.next();
    };

    const handlePrevious = () => {
        carouselRef.current.prev();
    };

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      };
      
      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

    return (
        <div className='how-it-works'>
            <motion.div 
            variants={container}
            initial="hidden"
            animate="visible"
            className='service-providers-container'>
                <ServiceProviders src={MTN} networkProvider="MTN" />
                <ServiceProviders src={AIRTEL} networkProvider="AIRTEL" />
                <ServiceProviders src={glo} networkProvider="GLO" />
                <ServiceProviders src={nineMobile} networkProvider="mobile" />
                {/* <ServiceProviders src={gotv} networkProvider="" /> */}
                <img className='w-[25%] md:h-[150px] md:w-[30%] mx-[auto] rounded-[1rem] border-1 border-red-500' src={exams} alt=''/>
                <motion.img className='w-[25%] md:h-[150px] md:w-[30%] mx-[auto] rounded-[1rem]' variants={item} src={cableTv} alt=''/>
                <motion.img className='w-[25%] md:h-[150px] md:w-[30%] mx-[auto] rounded-[1rem]' variants={item} src={ekdc} alt=''/>
                <motion.img className='w-[25%] md:h-[150px] md:w-[30%] mx-[auto] rounded-[1rem]' variants={item} src={eedc} alt=''/>
                <motion.img className='w-[25%] md:h-[150px] md:w-[30%] mx-[auto] rounded-[1rem]' variants={item} src={north} alt=''/>
                <motion.img className='w-[25%] md:h-[150px] md:w-[30%] mx-[auto] rounded-[1rem]' variants={item} src={aedc} alt=''/>
            </motion.div>
            <div className='complan'>
                <Carousel
                    ref={carouselRef}
                    dots={false}
                    >
                    <ComplanSlide
                        src={slide5}
                        textAHeading="You are invited"
                        textABody="To get started, either register using the referral link provided to you or input the referral ID that was sent to you. Once you've done that, simply fill in your information and select the registration package that suits your preferences."
                        benefits={["Instant registration bonus of 15% on any package"]}
                        page="1"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                    <ComplanSlide
                        src={slide2}
                        textAHeading="Commission-Based Transactions"
                        textABody="Get rewarded for every transaction made through the platform. Whether it's recharging mobile phones, subscribing data, paying utility bills. Earn commission from your downlines."
                        benefits={["Buy or sell data - up to 10% commission", "Buy or sell Airtime - up to 4% commission"]}
                        page="2"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                        <ComplanSlide
                        src={slide3}
                        textAHeading="Referral Bonus"
                        textABody="Get to earn direct and indirect referral bonus by referring your friends, colleagues to RechargeWise."
                        benefits={["Direct Referral Bonus - 25% commission", "Indirect Referral Bonus - 4%- 1% commission"]}
                        page="3"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                        <ComplanSlide
                        src={slide4}
                        textAHeading="Monthly Allowance"
                        textABody="Receive a monthly allowance of ₦120,000 when you get 10,000PV, (40, 40, 20 rule applies), within a month."
                        benefits={["Monthly Allowance - ₦120,000"]}
                        page="4"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                         <ComplanSlide
                        src={slide5}
                        textAHeading="Exciting Incentives"
                        textABody="By achieving certain milestones, you can earn exciting incentives such as land, a car, a house or even a trip abroad by having a total Personal Volume (PV) of (40, 40, 20 rule applies), spanning up to the 10th generation."
                        benefits={["a laptop and ₦300,000 - ₦600,000", "Family Trip abroad - ₦2,000,000", "Small Car Award - ₦3,000,000", "Big Car Award - ₦4, 500,000", "First House Fund - ₦7,000,000", "Second House Fund - ₦10,000,000"]}
                        page="5"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                </Carousel>
            </div>


        </div>
    )
}

export default HowItWorks