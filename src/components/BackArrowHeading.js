import React from 'react'
import { Link } from 'react-router-dom';
import arrowLeft from '../assets/icons/arrow-left.svg';

const BackArrowHeading = ({title, link}) => {
  return (
    <div className='flex items-center gap-[4rem] back-arrow-heading'>
        <Link to={`/${link}`}><img src={arrowLeft} alt='arrow' /></Link>
        <h2>{title}</h2>
    </div>
  )
}

export default BackArrowHeading