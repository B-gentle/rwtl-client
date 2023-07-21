import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../redux/features/user/userSlice';
import companyLogo from '../../../assets/images/RWT_LOGO-removebg-preview.png';
import './settings.scss';

const ProfileBanner = () => {
    const user = useSelector(selectUserData)
    return (
        <div className='profile-banner'>
            <img className='w-[60px] h-[60px] mr-[8px]' src={companyLogo} alt='avatar' />
            <span className='flex flex-col'>
                <h1>{user?.fullname}</h1>
                <h2>@{user?.username}</h2>
            </span>
        </div>
    )
}

export default ProfileBanner