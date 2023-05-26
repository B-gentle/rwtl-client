import React from 'react'
import { sidemenu } from '../../data'
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const logUserOut = () => {
         localStorage.removeItem("token")
       window.location.href='/'
       
    }
    const upperSideBar = sidemenu.slice(0, 3)
    const downSideBar = sidemenu.slice(3, sidemenu.length)
    return (
        <nav>
            <img src={logo} alt='company&apos;s logo' />
            <div className='sidenav-div'>
                <div>
                    {sidemenu && upperSideBar.map((item, id) => <NavLink to={`/${item.link}`} key={id} className={item.className}>
                        <img src={item.icon} alt='dash-icon' />
                        <span>{item.title}</span>
                    </NavLink>
                    )}
                </div>

                <div>
                    {sidemenu && downSideBar.map((item, id) => <NavLink to={`/${item.link}`} key={id} className={item.className} onClick={id === 2 && logUserOut}>
                        <img src={item.icon} alt='dash-icon' />
                        <span>{item.title}</span>
                    </NavLink>
                    )}
                </div>
            </div>

        </nav>
    )
}

export default Sidebar