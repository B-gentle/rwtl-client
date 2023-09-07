import React from 'react';
import { Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import BackArrowHeading from '../../components/BackArrowHeading'
import { selectUserData } from '../../redux/features/user/userSlice'
import { generateStaticAccount } from '../../services/usersApiCall';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';

const Topup = () => {

  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const generateStatAcc = async () => {
    dispatch(SET_LOADING())
    try { 
      const response = await generateStaticAccount();
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        message.success(response.data)
      } else {
        const message =
          (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }

    } catch (error) {
      dispatch(SET_ERROR());
      message.error(error.message)
    }
  }

  const user = useSelector(selectUserData);
  return (
    <div className='top-up h-screen'>
      <BackArrowHeading title="Top Up" link="more" />
      <p>Kindly top up your wallet using the details below. You can transfer from any source to this account number.</p>
      <div className='.account-details-container mt-[4rem]'>
        {user.staticAccount ?
          (<div className='flex flex-col gap-[1rem]'>
            <span className='flex justify-between'><b>Account number: </b><>{user.staticAccount}</></span>
            <span className='flex justify-between'><b>Account Name: </b> <>Rechargewise({user.staticAccountName})</></span>
            <span className='flex justify-between'><b>Bank Name: </b> <em>Providus Bank</em></span>
          </div>) : <Button type='button' loading={loading && true} onClick={generateStatAcc} className='rounded p-[1rem] bg-[#D2AC47] text-white items-center text-[1.2rem] border border-none flex m-auto'>Generate Static Account</Button>}
      </div>
    </div>
  )
}

export default Topup