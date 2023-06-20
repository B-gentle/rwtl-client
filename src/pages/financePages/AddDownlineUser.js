import { Form, Input, Button, Select, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../../components/EmptyState';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { packagesCall } from '../../services/apiCalls';
import { AddDownline } from '../../services/usersApiCall';
import './financePages.scss';
import RegistrationCompleted from './RegistrationCompleted';


const AddDownlineUser = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])
    

    const [packages, setPackages] = useState(null)
    const [registrationCompleted, setRegistrationCompleted] = useState(false)
    const { Option } = Select


    const dispatch = useDispatch();
    const loading = useSelector(selectLoading)

    const handlePackageList = async () => {
        packagesCall(setPackages, message);
    }

    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        const { password, confirmPassword } = values;
        if (password < 5 && password > 10) {
            dispatch(SET_ERROR())
            return message.error("Password must be greater than 4 characters and less than 10 Characters")
        }

        if (password !== confirmPassword) {
            dispatch(SET_ERROR())
            return message.error("Password does not match")
        }
        try {
            const response = await AddDownline(values)
            if (response.status === 201) {
                message.success(response.message)
                dispatch(SET_SUCCESS());
                setRegistrationCompleted(true)
            } else {
                const message =
            (response.data && response.data.message ) || (response.response && response.response.data && response.response.data.message) ||
            response.message ||
            response.toString();
          throw new Error(message)
            }
        } catch (error) {
            message.error(error.message)
            dispatch(SET_ERROR());
        }
    }

    if(registrationCompleted) {
        return (
            <>
            <RegistrationCompleted />
            </>
        )
    }

    return (
        <div>
            <h1>Register User</h1>
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item
                    label="Fullname"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                >
                    <Input placeholder="Fullname" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="Email" type="email" />
                </Form.Item>

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
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNo"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >

                    <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                    label="Select Package"
                    name="package"
                >
                    <Select defaultValue="Select Package"
                        notFoundContent={<EmptyState />}
                        onClick={handlePackageList}>
                        {packages && packages.map((option) => (
                            <Option key={option._id} value={option._id}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Bank Name"
                    name="bankName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Bank Name!',
                        },
                    ]}
                >

                    <Input placeholder="e.g UBA" />
                </Form.Item>

                <Form.Item
                    label="Account No."
                    name="accountNo"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your account number!',
                        },
                    ]}
                >

                    <Input placeholder="2060680907" />
                </Form.Item>

                <Form.Item
                    label="Account Name"
                    name="accountName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your account name!',
                        },
                    ]}
                >

                    <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item>
                    <Button className='auth-button' type="primary" htmlType="submit" block loading={loading && true}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddDownlineUser