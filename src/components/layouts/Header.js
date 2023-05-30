import { Badge } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Welcome from '../Welcome';
import './layouts.scss';
import copy from '../../assets/icons/copy.svg';
import share from '../../assets/icons/share.svg';
import notification from '../../assets/icons/notification.svg';
import profileIcon from '../../assets/icons/profile-pic-icon.svg';
import { SearchBox } from '../DashbardComponents';

const Header = () => {
  const onSearch = () => {

  }
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const user = JSON.parse(localStorage.getItem("userData"))
  return (
    <header className='header flex justify-between'>
      {isMobile ? (<>
      <span className='flex items-center'>
        <img className='w-[60px] h-[60px] mr-[8px]' src={profileIcon} alt='avatar' />
        <Welcome user={user} />
        </span>
        <Badge count={10}>
          <img src={notification} alt='notification' />
        </Badge>
        </>) : (<>
          <SearchBox />
      <span className='header--icons flex-row-reverse md:flex-row'>
        <input className="refLink hidden md:flex" type="text" defaultValue={user?.referralLink} />
        <img className='hidden md:flex' src={copy} alt='copy' />
        <img className='hidden md:flex' src={share} alt='share' />
        <Badge count={10}>
          <img src={notification} alt='notification' />
        </Badge>
       
        <img src={profileIcon} alt='avatar' />
      </span>
        </>)}

    </header>
  )
}

export default Header