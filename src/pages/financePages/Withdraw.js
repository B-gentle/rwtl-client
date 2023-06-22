import React, { useState } from 'react';
import { Button, Form, Input} from 'antd'
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import { useNavigate } from 'react-router-dom';
import './financePages.scss';
import SuccessPage from './SuccessPage';

const Withdraw = () => {
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
      console.log('Sending money to', formData.username, 'amount', formData.amount);
      // TODO: actually send the money
      // reset the form
      setConfirm(false);
      setTransactionSuccessful(true);
    }
  }

  return (
    <div className='send-money'>
      <BackArrowHeading  title={confirm ? "Confirm" : "Withdraw"} link="more" />
      <TotalBalance />
      <Form
      onFinish={onFinish}>

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
      <Input type="number" placeholder='Enter Amount' />
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

export default Withdraw