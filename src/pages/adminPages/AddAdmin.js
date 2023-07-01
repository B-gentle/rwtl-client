import { Button, Form, Input, message, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import BackArrowHeading from '../../components/BackArrowHeading';
import { AddNewAdmin } from '../../services/adminCalls';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate('/admin');
  const loading = useSelector(selectLoading)

  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    try {
      const response = await AddNewAdmin(values)
      if (response.status === 201) {
        dispatch(SET_SUCCESS())
        message.success("Admin Created")
        navigate('/admin')
      } else {
        const message =
          (response.data && response.data.message ) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      dispatch(SET_ERROR());
      message.error(error.message)
    }

  };
  return (
    <div className='p-[1rem]'>
      <BackArrowHeading title="Add Admin" link="admin" />
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
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select Admin role!' }]}
        >
           <Select
            placeholder="Select Admin role"
            options={[
              {
                value: 'super',
                label: 'Super Admin',
              },
              {
                value: 'director',
                label: 'Director Level',
              },
              {
                value: 'staff',
                label: 'Staff',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Telephone"
          name="phoneNo"
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