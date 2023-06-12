import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { sidemenu } from '../../data'
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png'
import { logoutUser } from '../../services/usersApiCall';
import { LOG_OUT_USER } from '../../redux/features/user/userSlice';

const Sidebar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logUserOut = async () => {
        await logoutUser();
        dispatch(LOG_OUT_USER(false));
        navigate("/");
    }
    const isMobile = useMediaQuery({maxWidth: 980})
    const upperSideBar = sidemenu.slice(0, 3)
    const downSideBar = sidemenu.slice(3, sidemenu.length)
    return (
        <nav>
            {isMobile ? (
            <>
            <img src={logo} alt='company&apos;s logo' />
            <div className='sidenav-div'>
                <div>
                    {sidemenu && sidemenu.map((item, id) => <NavLink to={id === 2 ? '/portfolio' : `/${item.link}`} key={id} className={item.className}>
                        <img src={item.mobileIcon} alt='dash-icon' />
                        <span>{item.mobileText}</span>
                    </NavLink>
                    )}
                </div>
            </div>
            </>) : (
            <>
            <img src={logo} alt='company&apos;s logo' />
            <div className='sidenav-div'>
                <div>
                    {sidemenu && upperSideBar.map((item, id) => <NavLink to={`/${item.link}`} key={id} className={item.className}>
                        <img src={item.icon} alt='dash-icon' />
                        <span>{item.text}</span>
                    </NavLink>
                    )}
                </div>

               <div>
                    {sidemenu && downSideBar.map((item, id) => <NavLink to={`/${item.link}`} key={id} className={item.className} onClick={id === 2 && logUserOut}>
                        <img src={item.icon} alt='dash-icon' />
                        <span>{item.text}</span>
                    </NavLink>
                    )}
                </div>
            </div>
            </>)}
             
        </nav>
    )
}

export default Sidebar