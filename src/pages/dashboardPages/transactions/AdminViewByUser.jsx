import { Button, Form, Input } from 'antd'
import React from 'react'

const AdminViewByUser = ({loading, onFinish, formName}) => {
    
  return (
    <div>
        <Form
        className='mt-[1rem]'
        onFinish={(value) => onFinish(value, formName)}
        name="username"
      >
        <Form.Item
          label="Username"
          name='username'
        >
          <Input />
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

export default AdminViewByUser