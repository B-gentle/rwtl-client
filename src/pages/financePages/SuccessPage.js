import { Button } from 'antd';
import React from 'react';
import success from '../../assets/images/success.gif';

const SuccessPage = ({details, setTransactionSuccessful, setFormData}) => {
    const handleReset = () => {
        setTransactionSuccessful(false);
        setFormData(null);
    }

  return (
    <div className='success-page'>
        <img src={success} alt='success'/>
        <span>Successful</span>
        <span>You have transferred ₦{details.amount} to {details.username}.</span>
        <Button type="primary" onClick={handleReset}>Done</Button>
    </div>
  )
}

export default SuccessPage