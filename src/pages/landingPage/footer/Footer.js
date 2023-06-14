import React from 'react';
import './footer.scss';
import logo from '../../../assets/images/RWT_LOGO-removebg-preview.png';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <img src={logo} alt='logo' />
      <div className='footer-middle-div'>
        <div>
          <p>RechargeWise we offer you the opportunity to make<br className='hidden md:block'/> money while paying bills.</p>
          <span>
            <header>Head Office</header>
            <a href='https://www.google.com/maps/place/5+Soji+Adepegba+Cl,+Allen+101233,+Ikeja,+Lagos/@6.6039921,3.3493193,16.79z/data=!4m6!3m5!1s0x103b9231f2240001:0x7820138d1f952fcb!8m2!3d6.6039391!4d3.3498843!16s%2Fg%2F11fly1b_2s?entry=ttu'>5, Soji Adepegba, Off Allen Ave Street, Ikeja.</a>
            <header className='mt-[21px]'>Email Address</header>
            <a href='mailto:rechargewisetech@gmail.com'>rechargewisetech@gmail.com</a>
          </span>
        </div>
        <div>
          <h1>Company</h1>
          <div>
            <Link to='/about'>About Us </Link>
            <ScrollLink to='how-it-works' spy={true} smooth={true} style={{cursor: 'pointer'}}>How To Earn </ScrollLink>
            <ScrollLink to="contact" spy={true} smooth={true} style={{cursor: 'pointer'}}>Contact Us </ScrollLink>
          </div>
        </div>
        <div>
          <h1>Other</h1>
          <div>
            <Link to='/'>Team</Link>
            <Link to='/'>Career</Link>
            <Link to='/'>Privacy Policy</Link>
          </div>
        </div>
        <div>
          <h1>Get latest update</h1>
          <div className='subscribe'>
            <Input placeholder='Enter your email' />
            <Button type='primary'>Subscribe</Button>

          </div>
          <div className="social-link">
            <span>
              <a href="https://www.facebook.com/RechargeWisetech"><FaFacebookF /></a>
              <a href="https://www.instagram.com/rechargewise_tech/?igshid=ZGUzMzM3NWJiOQ=="><FaInstagram /></a>
              <a href='https://www.linkedin.com/in/rechargewise-tech-9b273627a'><FaLinkedin /></a>
              <a href="https://wa.me/07068720576"><FaWhatsapp /></a>
              <a href="https://tiktok.com/@rechargewise_tech"><FaTiktok/></a>
              
              
              
            </span>
          </div>
        </div>
      </div>
      <div className='footer-note'>
        <span>Copyright &copy; {year} Rechargewise. All rights reserved</span>
        <span>Terms of Service</span>
      </div>
    </footer>
  )
}

export default Footer