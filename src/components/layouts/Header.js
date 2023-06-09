import { Badge } from 'antd';
import React, { useState } from 'react';
import './layouts.scss';
import copy from '../../assets/icons/copy.svg';
import share from '../../assets/icons/share.svg';
import notification from '../../assets/icons/notification.svg';
import profileIcon from '../../assets/icons/profile-pic-icon.svg';
import { SearchBox } from '../DashbardComponents';
import { selectUserData } from '../../redux/features/user/userSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const onSearch = () => {

  }
  const user = useSelector(selectUserData);
  const [showNotification, setShowNotification] = useState(true)
  
  
  return (
    <header className='header flex justify-between'>
          <SearchBox />
      <span className='header--icons flex-row-reverse md:flex-row'>
        <input className="refLink hidden md:flex" type="text" defaultValue={user?.referralLink} />
        <img className='hidden md:flex' src={copy} alt='copy' />
        <img className='hidden md:flex' src={share} alt='share' />
        <Badge dot={showNotification}>
          <img src={notification} alt='notification' />
        </Badge>
        <img src={profileIcon} alt='avatar' />
      </span>
    </header>
  )
}

export default Header