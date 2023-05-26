import React from 'react'
import searching from '../assets/images/searching.gif';
import { Input } from 'antd';

const EmptyAndSearch = ({referralLink, text, icon}) => {
    return (
        <div>
            <img className='center-item mx-auto max-w-full h-auto' src={searching} alt='loading' />
            <div>
                <p>{text}</p>
                <span className='flex'>
                <Input placeholder={referralLink} />
                <img src={icon} alt='copy' />
                </span>
            </div>
        </div>
    )
}

export default EmptyAndSearch