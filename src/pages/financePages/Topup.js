import React from 'react'
import BackArrowHeading from '../../components/BackArrowHeading'

const Topup = () => {
  return (
    <div className='top-up'>
        <BackArrowHeading title="Top Up" link="dashboard" />
        <p>Kindly top up your wallet using the details below. You can transfer from any source to this account number.</p>
        <div className='account-details-container'>
            <div className='flex flex-col'>
                <span>Account Name:</span>
                <span>Account Number:</span>
                <span>Bank Name:</span>
                </div>
            <div className='flex flex-col'>
                <span>Details</span>
                <span>Details</span>
                <span>Details</span>
                </div>
        </div>
    </div>
  )
}

export default Topup