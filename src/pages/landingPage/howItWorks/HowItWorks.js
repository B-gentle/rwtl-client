import React, { useRef } from 'react';
import { Carousel } from 'antd';
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

    return (
        <div className='how-it-works'>
            <div className='service-providers-container'>
                <ServiceProviders src={MTN} networkProvider="MTN" />
                <ServiceProviders src={AIRTEL} networkProvider="AIRTEL" />
                <ServiceProviders src={glo} networkProvider="GLO" />
                <ServiceProviders src={nineMobile} networkProvider="mobile" />
                {/* <ServiceProviders src={gotv} networkProvider="" /> */}
                <img className='w-[25%] md:h-[100px] md:w-[80%] mx-[auto] rounded-[1rem]' src={cableTv} alt=''/>
                <img className='w-[25%] md:h-[100px] md:w-[80%] mx-[auto] rounded-[1rem]' src={exams} alt=''/>
                <img className='w-[25%] md:h-[100px] md:w-[80%] mx-[auto] rounded-[1rem]' src={ekdc} alt=''/>
                <img className='w-[25%] md:h-[100px] md:w-[80%] mx-[auto] rounded-[1rem]' src={eedc} alt=''/>
                <img className='w-[25%] md:h-[100px] md:w-[80%] mx-[auto] rounded-[1rem]' src={north} alt=''/>
                <img className='w-[25%] md:h-[100px] md:w-[80%] mx-[auto] rounded-[1rem]' src={aedc} alt=''/>
            </div>
            <div className='complan'>
                <Carousel
                    ref={carouselRef}
                    dots={false}
                    >
                    <ComplanSlide
                        src={slide5}
                        textAHeading="You are invited"
                        textABody="To get started, either register using the referral link provided to you or input the referral ID that was sent to you. Once you've done that, simply fill in your information and select the registration package that suits your preferences."
                        benefits={["Instant registration bonus of 25% on any package"]}
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
                        benefits={["Direct Referral Bonus - 25% commission", "Indirect Referral Bonus - 6-1% commission"]}
                        page="3"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                        <ComplanSlide
                        src={slide4}
                        textAHeading="Monthly Allowance"
                        textABody="Receive a monthly allowance of ₦100,000 when you get 10,000PV, 40% accumulated PV from your direct referrals and 60% from your indirect referrals, within a month."
                        benefits={["Monthly Allowance - ₦100,000"]}
                        page="4"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                         <ComplanSlide
                        src={slide5}
                        textAHeading="Exciting Incentives"
                        textABody="By achieving certain milestones, you can earn exciting incentives such as land, a car, a house or even a trip abroad by having a total Personal Volume (PV) of 40% from your direct referrals, while the remaining 60% is accumulated from your indirect referrals, spanning up to the 10th generation."
                        benefits={["Laptop and 200k cash award - ₦500,000", "Trip abroad - ₦2,000,000", "Car Incentive - ₦3,000,000", "Land Incentive - ₦6, 000,000", "House Incentive - ₦10,000,000"]}
                        page="5"
                        handleNext={handleNext} handlePrevious={handlePrevious} 
                        />
                </Carousel>
            </div>


        </div>
    )
}

export default HowItWorks