import React from 'react';
import { Button } from 'antd';
import { FiMenu } from 'react-icons/fi'
import './navbar.scss';
import logo from '../../../assets/images/RWT_LOGO-removebg-preview.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt='logo' />
        <span className='hamburger'><FiMenu/></span>
        <span className='md:flex md:gap-[32px]'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink>How It Works</NavLink>
            <NavLink>Services</NavLink>
            <NavLink>Contact Us</NavLink>
        </span>
        <Button type='primary'>Get Started</Button>
    </nav>
  )
}

export default Navbar