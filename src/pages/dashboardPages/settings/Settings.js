import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaAngleRight } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { SearchBox } from '../../../components/DashbardComponents'
import { settingsMenu } from '../../../data';
import Profile from './Profile';
import './settings.scss';
import { logoutUser } from '../../../services/usersApiCall';
import { LOG_OUT_USER } from '../../../redux/features/user/userSlice';
import ProfileBanner from './ProfileBanner';

const Settings = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const isMobile = useMediaQuery({ maxWidth: 980 })
  const onChange = (key) => {
    console.log(key);
  };

  const lastElement = settingsMenu.length - 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logUserOut = async () => {
    await logoutUser();
    dispatch(LOG_OUT_USER(false));
    navigate("/");
  }

  const items = [
    {
      key: '1',
      label: `General Settings`,
      children: <div className='settingsLinks'>
        {settingsMenu && settingsMenu.map((item, id) => <Link style={{ color: id === lastElement && 'red' }} onClick={id === lastElement && logUserOut} to={item.to} key={id}>
          <span>
            <img src={item.img} alt="icon" />
            <span>{item.link}</span>
          </span>
          <FaAngleRight />
        </Link>)}
      </div>
    },
  ];

  return (
    <div>
      {isMobile ? (
        <div className='mobile-profile'>
          <h4>Profile</h4>
          <ProfileBanner />
          <h2 className='mt-[40px]'>General Settings</h2>
          <div className='settingsLinks'>
            {settingsMenu && settingsMenu.map((item, id) => <Link style={{ color: id === lastElement && 'red' }} onClick={id === lastElement && logUserOut} to={item.to} key={id}>
              <span>
                <img src={item.img} alt="icon" />
                <span>{item.link}</span>
              </span>
              <FaAngleRight />
            </Link>)}
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-between'>
            <h2>Settings</h2> <SearchBox />
          </div>
          <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Settings