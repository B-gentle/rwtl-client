import React from 'react';
import './contact.scss';
import contact from '../../../assets/images/contact.svg';

const Contact = () => {
  return (
    <div className='contact'>
<div>
    <h1 className='bg-[green] rounded-[10px]'>Contact Us</h1>
    <p>Do you have any enquiries and wants to get in touch with us? Reach out to us and we'll get back to you.</p>
    <span>
    <main>
        <header>Head Office</header>
        <a href='https://www.google.com/maps/place/5+Soji+Adepegba+Cl,+Allen+101233,+Ikeja,+Lagos/@6.6039921,3.3493193,16.79z/data=!4m6!3m5!1s0x103b9231f2240001:0x7820138d1f952fcb!8m2!3d6.6039391!4d3.3498843!16s%2Fg%2F11fly1b_2s?entry=ttu'>5, Soji Adepegba, Off Allen Ave Street, Ikeja.</a>
    </main>
    <main>
        <header>Email Address</header>
        <a href='mailto:rechargewisetech@gmail.com'>rechargewisetech@gmail.com</a>
    </main>
    </span>
</div>
<img src={contact} alt='contact' />
    </div>
  )
}

export default Contact