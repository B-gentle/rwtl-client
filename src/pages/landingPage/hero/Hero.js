import React from 'react';
import './hero.scss';
import award from '../../../assets/images/medal-star.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div>
        <span>
          <img src={award} alt='' />
          <span>Direct and Indirect Bonus</span>
        </span>
        <h1>Earn Commission on Every Recharge and Referral</h1>
        <p>
          RechargeWise is an innovative company that offers individuals an opportunity to earn commissions simply by recharging their own devices, paying bills or referring friends and family to the platform.
        </p>
        <div>
          <Link to='/signup'>
            <Button>Get Started</Button>
          </Link>
          <Link to='/login'>
            <Button>Log In</Button>
          </Link>

        </div>

      </div>
      <div></div>

    </div>
  )
}

export default Hero