import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';

const AddAdmin = () => {

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading)

  const onFinish = (values) => {
   dispatch(SET_LOADING())
   
  };
  return (
    <div>
  <Form
    name="basic"
    onFinish={onFinish}
  >
    <Form.Item
      label="Full Name"
      name="fullname"
      rules={[{ required: true, message: 'Please input your Full Name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Telephone"
      name="phoneNumber"
      rules={[{ required: true, message: 'Please input your phone number!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="PV"
      name="pv"
      rules={[{ required: true, message: 'Provide Admin with PV!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Fund Admin"
      name="walletBalance"
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        Add Admin
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default AddAdmin