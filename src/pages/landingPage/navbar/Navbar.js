import React, { useState } from 'react';
import { Button } from 'antd';
import { FiMenu } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './navbar.scss';
import logo from '../../../assets/images/RWT_LOGO-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav>
        <img src={logo} alt='logo' />
        <span onClick={() => {setShowMenu(!showMenu)}} className='hamburger'>{showMenu ? <AiOutlineCloseCircle/> : <FiMenu/>}</span>
        <span onClick={() => {setShowMenu(!showMenu)}} className={showMenu ? 'show links' : 'links'}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <ScrollLink to='how-it-works'>How It Works</ScrollLink>
            <NavLink>Services</NavLink>
            <NavLink>Contact Us</NavLink>
        </span>
        <Button type='primary'>Get Started</Button>
    </nav>
  )
}

export default Navbar