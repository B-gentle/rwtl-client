import { Badge } from 'antd';
import React from 'react';
import './layouts.scss';
import copy from '../../assets/icons/copy.svg';
import share from '../../assets/icons/share.svg';
import notification from '../../assets/icons/notification.svg';
import profileIcon from '../../assets/images/RWT_LOGO-removebg-preview.png';
import { SearchBox } from '../DashbardComponents';
import { selectUserData } from '../../redux/features/user/userSlice';
import { useSelector } from 'react-redux';

const Header = ({ displayNotifications, setDisplayNotifications, newNotification }) => {
  const onSearch = () => {

  }
  const user = useSelector(selectUserData);

  return (
    <header className='header flex justify-between'>
      <SearchBox />
      <span className='header--icons flex-row-reverse md:flex-row'>
        <input className="refLink hidden md:flex" type="text" defaultValue={user?.referralLink} />
        <img className='hidden md:flex' src={copy} alt='copy' />
        <img className='hidden md:flex' src={share} alt='share' />
        <Badge dot={newNotification} onClick={() => { setDisplayNotifications(!displayNotifications) }}>
          <img src={notification} alt='notification' />
        </Badge>
        <img className='w-[30px]' src={profileIcon} alt='avatar' />
      </span>
    </header>
  )
}

export default Header