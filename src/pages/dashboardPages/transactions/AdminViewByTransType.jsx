import { Button, Form, Input, Select } from 'antd'
import React from 'react'

const AdminViewByTransType = ({onFinish, loading, formName}) => {
  return (
    <div>
        <Form
        className='mt-[1rem]'
        onFinish={(value) => onFinish(value, formName)}
      >

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
            placeholder="Select Transaction Type"
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
          label="Transaction Date"
          name="period"
        >
          <Input type='date' />
        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit" block loading={loading && true}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminViewByTransType