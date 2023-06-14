import React from 'react';
import prev from '../../../assets/images/arrow-circle-left.png';
import next from '../../../assets/images/arrow-circle-right.png';

const TeamSlide = ({ img, name, title, text, handleNext, handlePrevious }) => {
    return (
        <div className='team-slide'>
            <div>
                <h1>{name}</h1>
                <h4>{title}</h4>
                <p>{text}</p>
                <div className='hidden'>
                    <img onClick={handlePrevious} src={prev} alt='' />
                    <img onClick={handleNext} src={next} alt='' />
                </div>
            </div>
            <div>
                <img src={img} alt='' />
            </div>
        </div>
    )
}

export default TeamSlide