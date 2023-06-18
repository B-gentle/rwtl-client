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
            <Link to="/cable" className='more-links'>
                <span>Cable</span>
                <FaAngleRight />
            </Link>
            <Link to="/electricity" className='more-links'>
                <span>Electricity</span>
                <FaAngleRight />
            </Link>
            <Link to="/electricity" className='more-links'>
                <span>Exams</span>
                <FaAngleRight />
            </Link>
            </div>
    </div>
  )
}

export default More