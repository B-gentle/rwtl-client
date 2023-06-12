import React from 'react';
import packageIcon from '../assets/icons/dashboard_icons/package-icon.svg';
import './components.scss'

const Welcome = ({user}) => {
  return (
    <div className='flex flex-col md:flex-row justify-between md:pt-[32px] md:pb-[32px]'>
                <span className='greetings'>
                    <h5>Hello {user?.fullname},</h5>
                    <p>Welcome back<span className='hidden md:inline'>to RechargeWise</span></p>
                </span>
                <span>
                    <span className='package-name'>
                        <img src={packageIcon} alt='package-icon' />
                        <span>{user?.package?.name}</span>
                    </span>
                </span>
            </div>
  )
}

export default Welcome