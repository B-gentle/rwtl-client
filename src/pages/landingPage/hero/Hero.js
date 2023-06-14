import React from 'react';
import './hero.scss';
import award from '../../../assets/images/medal-star.svg';
import heroImage from '../../../assets/images/heroImage.png';
// import activeFrame from '../../../assets/images/activeUsersFrame.png';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div>
        {/* <span className='award-span'>
          <img src={award} alt='' />
        </span> */}
        <h1>Welcome To Rechargewise Technologies, our world of digitally transformed airtime vending and...</h1>
        <p>
          Expecting write up here
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
        <img src={heroImage} alt=''/>
      </div>

    </div>
  )
}

export default Hero