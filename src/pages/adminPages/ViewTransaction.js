import React from 'react';
import { Form, Button, Input, Select } from 'antd'
import BackArrowHeading from '../../components/BackArrowHeading';

const ViewTransaction = () => {

  // const dispatch = useDispatch()
  const onFinish = async () => {
try {
  
} catch (error) {
  
}
  }
  return (
    <div className='p-[1rem]'>
      <BackArrowHeading title="View User Transaction" link="admin" />
      <Form
        className='mt-[1rem]'
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
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
          label="Transaction Type"
          name="transactionType"
          rules={[
            {
              required: true,
              message: 'Please select transaction type!',
            },
          ]}
        >

          <Select
            placeholder="Select Transaaction Type"
            options={[
              {
                value: 'airtime',
                label: 'Airtime',
              },
              {
                value: 'data',
                label: 'Data',
              },
              {
                value: 'cableTv',
                label: 'Cable',
              },
              {
                value: 'commissionTransfer',
                label: 'Commission Transfer',
              },
              {
                value: 'fundTransfer',
                label: 'Fund Transfer',
              },
              {
                value: 'electricity',
                label: 'Electricity',
              },
              {
                value: 'upgrade',
                label: 'Upgrade',
              },
              {
                value: 'exams',
                label: 'Exams',
              },
            ]}
          />

        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ViewTransaction