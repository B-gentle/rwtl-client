import { Button, Form, Input } from 'antd'
import React from 'react'

const AdminViewByTransDate = ({onFinish, loading, formName}) => {
  return (
    <div>
        <Form
        name='username'
        className='mt-[1rem]'
        onFinish={(value) => onFinish(value, formName)}
      >
        <Form.Item
          label="From"
          name="from"
        >
          <Input type='date' />
        </Form.Item>

        <Form.Item
          label="To,"
          name="to"
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

export default AdminViewByTransDate