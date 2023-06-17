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
            <Link to="/buydata" className='more-links'>
                <span>Data</span>
                <FaAngleRight />
            </Link>
            <Link to="/buyairtime" className='more-links'>
                <span>Airtime</span>
                <FaAngleRight />
            </Link>
            <p className='flex justify-between mb-3'>
                <span>Cable</span>
                <FaAngleRight />
            </p>
            <p className='flex justify-between mb-3'>
                <span>Electricity</span>
                <FaAngleRight />
            </p>
            </div>
    </div>
  )
}

export default More