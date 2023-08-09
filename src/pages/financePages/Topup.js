import React from 'react'
import { useSelector } from 'react-redux'
import BackArrowHeading from '../../components/BackArrowHeading'
import { selectUserData } from '../../redux/features/user/userSlice'

const Topup = () => {

  const user = useSelector(selectUserData);
  return (
    <div className='top-up'>
      <BackArrowHeading title="Top Up" link="more" />
      {user.staticAccount ? 
      (<div className='flex flex-col gap-[1rem]'>
        <span><b>Account number: </b>{user.staticAccount}</span> 
        <span><b>Account Name: </b>{user.staticAccountName}</span>
        </div> ) : <button>Generate Static Account</button>}
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