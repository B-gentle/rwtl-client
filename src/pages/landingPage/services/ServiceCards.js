import React from 'react';
import './services.scss';

const ServiceCards = ({heading, text, icon}) => {
  return (
    <div className='service-card bg-[green]'>
        <div>
            <img src={icon} alt=''/>
        </div>
        <div>
            <h1>{heading}</h1>
            <p>{text}</p>
        </div>
        </div>
  )
}

export default ServiceCards