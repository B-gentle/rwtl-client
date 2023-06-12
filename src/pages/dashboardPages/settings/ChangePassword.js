import { Button, Card, Form, Input, message } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import React from 'react';
import '../../../pages/authPages/auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../../components/BackArrowHeading';
import { changePassword } from '../../../services/usersApiCall';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../../redux/features/processingStates/processStatesSlice';

const ChangePassword = () => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        const { password, cNewPassword } = values;
        if (password !== cNewPassword) {
            return message.error("Passwords Don't Match")
        }
        try {
            const response = await changePassword(values);
            if (response.statusText === 'OK') {
                message.success(response.data)
                dispatch(SET_SUCCESS());
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
            console.log(error)
        }
    };

    return (
        <div className=''>
            <BackArrowHeading title="Change Password" />
            <Form
                className='mt-[30px]'
                onFinish={onFinish}
                layout='vertical'>
                <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your old Password!' }]}
                >
                    <Input placeholder='Password' />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter a new Password!' }]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="cNewPassword"
                    rules={[{ required: true, message: 'Please confirm your Password!' }]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>
                <Form.Item>
                    <Button className='auth-button' block type="primary" htmlType="submit" loading={loading && true}>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePassword