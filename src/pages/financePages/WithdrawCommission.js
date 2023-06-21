import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading';
import TotalBalance from '../../components/TotalBalance';
import { selectLoading, SET_ERROR, SET_LOADING } from '../../redux/features/processingStates/processStatesSlice';
import { selectUserData } from '../../redux/features/user/userSlice';

const WithdrawCommission = () => {

    useEffect(() => {
     window.scrollTo(0,0);
    }, [])
    

    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    const user = useSelector(selectUserData)
    const [confirm, setConfirm] = useState(false)
    const [formData, setFormData] = useState(null)
    const [transactionSuccessful, setTransactionSuccessful] = useState(false);

    const onFinish = async(value) => {
        if (!confirm) {
            setFormData(value);
            setConfirm(true);
            window.scrollTo(0, 0);
          } else {
            //make the api call here
            dispatch(SET_LOADING())
            try {
            //   const response = await sendMoney(value)
            //   if (response.status === 200) {
            //     dispatch(SET_SUCCESS())
            //     message.success(response.data.message)
            //   } else {
            //     const message =
            //       (response.response && response.response.data && response.response.data.message) ||
            //       response.message ||
            //       response.toString();
            //     throw new Error(message)
            //   }
            } catch (error) {
              dispatch(SET_ERROR())
              message.error(error.message)
            }
      
            // TODO: actually send the money
            // reset the form
            setConfirm(false);
            setTransactionSuccessful(true);
          }
    }
  return (
    <div>
        <div className='send-money'>
      <BackArrowHeading title={confirm ? "Confirm" : "Transfer Commission"} link="dashboard" />
      <div className='total-amount'>
        <h2>Total Balance</h2>
        <h3>₦{user.withdrawableCommission}</h3>
    </div>
      <Form
        onFinish={onFinish}
        >

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
          <Input type="number" />
        </Form.Item>

        <Form.Item
        >
          {!confirm ? (
            <Button type="primary" htmlType="submit" block>
              Send Money
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" block loading={loading && true}>
              Transfer Commission
            </Button>
          )}
        </Form.Item>
      </Form>

    </div>
    </div>
  )
}

export default WithdrawCommission