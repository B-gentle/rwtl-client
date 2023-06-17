import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import success from '../../assets/images/success.gif';

const RegistrationCompleted = () => {

    const navigate = useNavigate()

    const handleOk = () => {
        navigate('/downlines')
    }
    return (
        <div className='success-page'>
            <img src={success} alt='success' />
            <span>Congratulations</span>
            <p className='text-left p-[1rem]'>Registration Successful</p>

            <div className='flex gap-[1rem]'>
                <Button type="primary" onClick={handleOk}>Done</Button>
            </div>

        </div>
    )
}

export default RegistrationCompleted