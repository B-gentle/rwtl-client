import React from 'react'
import BackArrowHeading from '../../components/BackArrowHeading'

const Topup = () => {
  return (
    <div className='top-up'>
      <BackArrowHeading title="Top Up" link="dashboard" />
      <p>Kindly top up your wallet using the details below. You can transfer from any source to this account number.</p>
      <div className='.account-details-container'>
        <div className='flex justify-between'>
          <span>Account Name:</span>
          <span>RECHARGEWISE TECHNOLOGIES LIMITED</span>
        </div>
        <div className='flex justify-between'>
          <span>Account Number:</span>
          <span>2001103756</span>
        </div>
        <div className='flex justify-between'>
          <span>Bank Name:</span>
          <span>FCMB</span>
        </div>
      </div>
    </div>
  )
}

export default Topup