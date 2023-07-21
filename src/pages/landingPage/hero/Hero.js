import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { GiMoneyStack } from 'react-icons/gi'
import './hero.scss';
import award from '../../../assets/images/medal-star.svg';
import heroImage from '../../../assets/images/heroImage.png';
// import activeFrame from '../../../assets/images/activeUsersFrame.png';


const Hero = () => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)'});
  return (
    <div className='hero'>
      <div>
        {/* <span className='award-span'>
          <img src={award} alt='' />
        </span> */}
        <motion.h1
          initial={isMobileScreen ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
          animate={isMobileScreen ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className='text-center'
        >Welcome To Rechargewise Technologies</motion.h1>
        <p style={{ fontSize: '18px' }}>A world of digital and lifestyle transformation through airtime vending and bill payments.
        </p>
        <p className='write-ups'>
          We provide Virtual Top Up (VTU) solutions such as; data subscriptions, electricity bills payment, airtime, cable TV subscriptions, WAEC & NECO results PIN, recharge card printing and a lot more at highly subsidised rates.
          <br /><br />
          <GiMoneyStack color='#DDB05B' size={20} /> Rechargewise is designed to create wealth for participating partners, by extension, an avenue for community development.
          <br /><br />
          <GiMoneyStack color='#DDB05B' size={20} /> Rechargewise, grant her users the franchise to own and operate Virtual Top Up (VTU) business within the telecommunication ecosystem with a robust revenue sharing package on our various services and products.
          <br /><br />
          <GiMoneyStack color='#DDB05B' size={20} />Rechargewise is the simplest, easiest & fastest way to achieve wealth and financial security.
          <br /><br />
          <GiMoneyStack color='#DDB05B' size={20} />  With our auto-wallet funding system, you enjoy instant funding of your wallet through bank transfer, USSD, etc. With RWT, you are just a touch away from your next recharge!
          <br /><br />
          RWT...transforming  lives, and connecting people
        </p>
        <div className='hero-buttons'>
          <Link to='/signup'>
            <Button type='primary'>Get Started</Button>
          </Link>
          <Link to='/login'>
            <Button>Log In</Button>
          </Link>

        </div>
        {/* <div className='active-frame'>
          <img src={activeFrame} alt='' />
        </div> */}

      </div>
      <div className='second-div'>
        <img src={heroImage} alt='' />
      </div>

    </div>
  )
}

export default Hero