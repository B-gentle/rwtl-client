import React, { useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import BackArrowHeading from '../../components/BackArrowHeading';

const More = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className='more'>
      <BackArrowHeading title="More" link="dashboard" />
      <div className='flex flex-col gap-[45px] mb-[400px]'>
            <Link to="/sendmoney" className='more-links'>
                <span>Send Money</span>
                <FaAngleRight />
            </Link>
            <Link to="/withdraw" className='more-links'>
                <span>Withdraw</span>
                <FaAngleRight />
            </Link>
            <Link to="/topup" className='more-links'>
                <span>Fund Wallet</span>
                <FaAngleRight />
            </Link>
            <Link to="/electricity" className='more-links'>
                <span>Electricity</span>
                <FaAngleRight />
            </Link>
            <Link to="/exams" className='more-links'>
                <span>Exams</span>
                <FaAngleRight />
            </Link>
            <Link to="/cardprinting" className='more-links'>
                <span>Recharge Card Printing</span>
                <FaAngleRight />
            </Link>
            </div>
    </div>
  )
}

export default More