import React, { useState } from 'react';
import { Button, Form, Input} from 'antd'
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import { useNavigate } from 'react-router-dom';
import './financePages.scss';
import SuccessPage from './SuccessPage';

const SendMoney = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

  if(transactionSuccessful){
    return <SuccessPage details={formData} setTransactionSuccessful={setTransactionSuccessful} setFormData={setFormData} />
  }

  const onFinish = (value) => {
    if(!confirm){
      setFormData(value);
      setConfirm(true);
      window.scrollTo(0, 0);
    }else{
      //make the api call here

      // TODO: actually send the money
      // reset the form
      setConfirm(false);
      setTransactionSuccessful(true);
    }
  }

  return (
    <div className='send-money'>
      <BackArrowHeading  title={confirm ? "Confirm" : "Send Money"} link="dashboard" />
      <TotalBalance />
      {!confirm && <div>
        <h5>Send to:</h5>
        names
      </div>}
      <Form
      onFinish={onFinish}>
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
            <Button type="primary" htmlType="submit" block>
              Send Money
            </Button>
          )}
    </Form.Item>
      </Form>

    </div>
  )
}

export default SendMoney