import React from 'react';
import './hero.scss';
import award from '../../../assets/images/medal-star.svg';
import heroImage from '../../../assets/images/heroImage.png';
// import activeFrame from '../../../assets/images/activeUsersFrame.png';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div>
        {/* <span className='award-span'>
          <img src={award} alt='' />
        </span> */}
        <h1 className='text-center'>Welcome To Rechargewise Technologies</h1>
        <p style={{fontSize: '18px'}}>Our world of digitally transformed airtime vending and bill payment platform.</p>
        <p className='write-ups'>
          We provide Virtual Top Up (VTU) business solutions for Data Subscriptions, Electricity Bills Payment, Airtime, Cable TV Subscriptions, WAEC & Neco Result Pin, Recharge Card Printing, etc, at highly subsidized rates.
         <br /><br />
          ✅Rechargewise is a platform that will create wealth for people thereby lifting many out of poverty.
          <br /><br />
          ✅It gives you the license (Right) to own and operate your own Virtual Top Up (VTU) business in the Telecoms Sector and share profit on the payments on Airtime vending and utilities bills.
          <br /><br />
          ✅Rechargewise Tech is the simplest, easiest & fastest way to achieving wealth, the platform is designed to help you set up a Plan B financially and earn residual income seamlessly.
          <br /><br />
          ✅With our auto-wallet funding system, you enjoy instant funding of your wallet through bank transfer, ussd, etc. This means, you are just a touch away from your next recharge!
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