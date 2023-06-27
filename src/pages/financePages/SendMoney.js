import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd'
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import { useNavigate } from 'react-router-dom';
import './financePages.scss';
import SuccessPage from './SuccessPage';
import { sendMoney } from '../../services/transactionCalls';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';

const SendMoney = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading)
  const [formData, setFormData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const [form] = Form.useForm();

  if (transactionSuccessful) {
    return <SuccessPage details={formData} setTransactionSuccessful={setTransactionSuccessful} setFormData={setFormData} />
  }

  const onFinish = async (value) => {
    if (!confirm) {
      setFormData(value);
      setConfirm(true);
      window.scrollTo(0, 0);
    } else {
      //make the api call here
      dispatch(SET_LOADING())
      try {
        const response = await sendMoney(value)
        if (response.status === 200) {
          dispatch(SET_SUCCESS())
          message.success(response.data.message)
          setConfirm(false);
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
        message.error(error.message)
      }

      // TODO: actually send the money
      // reset the form

    }
  }

  return (
    <div className='send-money'>
      <BackArrowHeading title={confirm ? "Confirm" : "Send Money"} link="more" />
      <TotalBalance />
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
          <Input />
        </Form.Item>

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
              Send Money
            </Button>
          )}
        </Form.Item>
      </Form>

    </div>
  )
}

export default SendMoney