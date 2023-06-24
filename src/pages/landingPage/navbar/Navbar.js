import React, { useState } from 'react';
import { Button } from 'antd';
import { FiMenu } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './navbar.scss';
import logo from '../../../assets/images/RWT_LOGO-removebg-preview.png';
import { Link, NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav>
       <Link to='/'>
      <div className='flex'>
      <img className='w-[40px] h-[45px]' src={logo} alt='logo' />
      <h1 className='md:hidden text-[#DDB05B] pt-[1rem]'>Rechargewise Technologies</h1>
      </div>
      </Link>
        <span onClick={() => {setShowMenu(!showMenu)}} className='hamburger'>{showMenu ? <AiOutlineCloseCircle/> : <FiMenu/>}</span>
        <span onClick={() => {setShowMenu(!showMenu)}} className={showMenu ? 'show links' : 'links'}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <ScrollLink to='complan' spy={true} smooth={true} style={{cursor: 'pointer'}}>How It Works</ScrollLink>
            <ScrollLink to="services" spy={true} smooth={true} style={{cursor: 'pointer'}}>Services</ScrollLink>
            <ScrollLink to="contact" spy={true} smooth={true} style={{cursor: 'pointer'}}>Contact Us</ScrollLink>
            <NavLink to='/login'>Login</NavLink>
        </span>
        <Button type='primary'>Get Started</Button>
    </nav>
  )
}

export default Navbar