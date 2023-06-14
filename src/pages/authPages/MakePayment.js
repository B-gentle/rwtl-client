import { Button, message } from 'antd';
import React from 'react';
import { RegisterUser } from '../../services/usersApiCall';
import success from '../../assets/images/success.gif';
import { useDispatch } from 'react-redux';
import { SET_ERROR, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';

const MakePayment = ({ setShowPayment, formData, setFormData, packages }) => {
    const dispatch = useDispatch();
    const handleSubmission = async () => {
        try {
            const response = await RegisterUser(formData)
            console.log(response)
            if (response.status === 201) {
                message.success(response.message)
                dispatch(SET_SUCCESS());
                // dispatch(LOG_IN_USER(true))
                setShowPayment(false);
                setFormData(null);
            } else {
                const message =
                    (response && response.response.data && response.response.data.message) ||
                    response.message ||
                    response.toString();
                throw new Error(message)
            }
        } catch (error) {
            message.error(error.message)
            dispatch(SET_ERROR());
        }
    }

    const handleReset = () => {
        setShowPayment(false);
        setFormData(null);
    }

    return (
        <div className='success-page'>
            <img src={success} alt='success' />
            <span>Complete Registration</span>
            <p className='text-left p-[1rem]'>Dear User, <br />To complete your registration, kindly make a transfer of: ₦{formData.packageAmount} to the account below:</p>
         <span className='text-left pl-[1rem] mb-[1rem]'> Account Number: 2001103756<br/> Account Name: RECHARGEWISE TECHNOLOGIES LIMITED <br/> Bank Name: FCMB</span>
            <div className='flex gap-[1rem]'>
                <Button type="primary" onClick={handleSubmission}>Done</Button>
                <Button type="primary" onClick={handleReset}>Cancel</Button>
            </div>
            <small className='my-[2rem]'>Do not refresh the page without clicking <b>Done</b> or <b>Cancel</b></small>

        </div>
    )
}

export default MakePayment