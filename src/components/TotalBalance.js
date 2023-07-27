import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/features/user/userSlice';
import './components.scss';

const TotalBalance = () => {
  const user = useSelector(selectUserData)
  return (
    <div className='total-amount'>
      <h2>Total Balance</h2>
      <h3>₦{user.walletBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</h3>
    </div>
  )
}

export default TotalBalance