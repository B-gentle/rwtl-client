import { Button, Form, Input, message } from 'antd';
import React from 'react';
import '../../../pages/authPages/auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../../components/BackArrowHeading';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../../redux/features/processingStates/processStatesSlice';
import { useLocation } from 'react-router-dom';

const ChangePassword = ({changePassword}) => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const location = useLocation();

    const linkTo = location.pathname === "/change-password" ? "settings" : "admin";

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
        <div className='p-[1rem]'>
            <BackArrowHeading title="Change Password" link={linkTo} />
            <Form
                className='mt-[30px] md:mt-[2rem] md:w-1/2 md:m-auto'
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