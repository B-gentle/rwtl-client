import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd'
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import loaderIcon from '../../assets/images/loadingRings.gif';
import './financePages.scss';
import SuccessPage from './SuccessPage';
import { sendMoney } from '../../services/transactionCalls';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { getFullName } from '../../services/usersApiCall';

const SendMoney = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading)
  const [formData, setFormData] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [lockInput, setLockInput] = useState(false);
  const [loader, setLoader] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const [form] = Form.useForm();

  if (transactionSuccessful) {
    return <SuccessPage details={formData} setTransactionSuccessful={setTransactionSuccessful} setFormData={setFormData} />
  }

  const showName = async (e) => {
    setLoader(true)
    try {
      let username = e.target.value
      const response = await getFullName({ username })
      if (response.status === 200) {
        setLoader(false)
        setFullName(response.data)
        setLockInput(true)
      } else {
        const message =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }

    } catch (error) {
      setLoader(false)
      setFullName(null)
      setLockInput(false)
      message.error(error.message)
    }

  }

  const makePayment = async(value) => {
    dispatch(SET_LOADING())
    try {
      const response = await sendMoney(value)
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        message.success(response.data.message)
        setConfirm(false);
        setFullName(null);
        setTransactionSuccessful(true);
        form.resetFields();
      } else {
        const message =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      dispatch(SET_ERROR())
      setFullName(null)
      form.resetFields();
      message.error(error.message)
    }
  }

  const onFinish = async (value) => {
    if (!confirm) {
      setFormData(value);
      setConfirm(true);
      window.scrollTo(0, 0);
    } else {
      //make the api call here
      makePayment(value)
    }
  }

  return (
    <div className='send-money'>
      <BackArrowHeading title={confirm ? "Confirm" : "Send Money"} link="more" />
      <TotalBalance />
      {confirm ? (
        <>
          <section className='mb-[2rem] flex justify-center text-[#392c23] flex-wrap'>
            You are about to transfer {formData.amount} to {formData.username}
          </section>
          <div className='flex gap-[2rem] justify-center'>
            <Button className='bg-[red] text-white font-[600] text-[1rem]' onClick={() => { setConfirm(false) }}>Cancel</Button>
            <Button className='bg-[green] text-white font-[600] text-[1rem]' type="primary" onClick={()=> {makePayment(formData)}} loading={loading && true}>Proceed</Button>
          </div>
        </>) : (
        <Form
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            initialValue={formData}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input onBlur={showName} />
          </Form.Item>

          <div className='flex justify-center'>
            {loader ? <img className='w-[50px] h-[50px] rounded-[100px]' src={loaderIcon} alt='' /> :
              <p>{fullName}</p>}
          </div>


          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Please enter an amount!',
              },
            ]}
          >
            <Input type="number" disabled={lockInput ? false : true} />
          </Form.Item>

          <Form.Item
          >
            <Button type="primary" htmlType="submit" block disabled={lockInput ? false : true}>
              Send Money
            </Button>
          </Form.Item>
        </Form>
      )}

    </div>
  )
}

export default SendMoney