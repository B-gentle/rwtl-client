import React from 'react'
import searching from '../assets/images/searching.gif';
import { Input } from 'antd';

const EmptyState = ({referralLink, text, icon}) => {
    return (
        <div>
            <img className='center-item mx-auto max-w-full h-auto' src={searching} alt='loading' />
        </div>
    )
}

export default EmptyState