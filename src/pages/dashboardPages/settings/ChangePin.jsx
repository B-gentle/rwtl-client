import { Button, Form, Input, message } from 'antd';
import React from 'react';
import '../../../pages/authPages/auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../../components/BackArrowHeading';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../../redux/features/processingStates/processStatesSlice';
import { selectUserData } from '../../../redux/features/user/userSlice';
import { Link, useLocation } from 'react-router-dom';
import { CreatePin, changePin } from '../../../services/usersApiCall';

const ChangePin = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUserData)
    const loading = useSelector(selectLoading);
    const location = useLocation();

    const linkTo = location.pathname === "/change-pin" ? "settings" : "admin";

    const createPin = async (values) => {
        dispatch(SET_LOADING())
        const { newPin, cNewPin } = values
        try {
            if (newPin.length < 4 || newPin.length > 4) {
                message.error('Select any four digit character')
            }

            if (newPin !== cNewPin) {
                return message.error('Pin does not match')
            }

            const response = await CreatePin({ pin: newPin })
            console.log(response)
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
        }

    }

    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        const { newPin, cNewPin } = values;

        if (newPin.length < 4 || newPin.length > 4) {
            message.error('Select any four digit character')
        }

        if (newPin !== cNewPin) {
            return message.error("Pin Mismatch")
        }
        try {
            const response = await changePin(values);
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
        }
    };

    return (
        <div className='p-[1rem]'>
            <BackArrowHeading title={user.transactionPin ? "Change Pin" : "Create Transaction Pin"} link={linkTo} />
            {user.transactionPin ?
                (
                    <Form
                        className='mt-[2rem] md:mt-[2rem] md:w-1/2 md:m-auto'
                        onFinish={onFinish}
                        layout='vertical'>
                        <Form.Item
                            label="Old Pin"
                            name="oldPin"
                            rules={[{ required: true, message: 'Please input your old Pin!' }]}
                        >
                            <Input placeholder='****' />
                        </Form.Item>

                        <div className='text-right'>
                            <Link style={{fontSize: '1.2rem', color: '#3a3a3a'}} className='font-[600]' to="/forgot-password">Forgot Pin</Link>
                        </div>

                        <Form.Item
                            label="New Pin"
                            name="newPin"
                            rules={[{ required: true, message: 'Please enter a new Pin!' }]}
                        >
                            <Input.Password placeholder='****' />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Pin"
                            name="cNewPin"
                            rules={[{ required: true, message: 'Please confirm your Pin!' }]}
                        >
                            <Input.Password placeholder='****' />
                        </Form.Item>
                        <Form.Item>
                            <Button className='auth-button' block type="primary" htmlType="submit" loading={loading && true}>
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Form
                        className='mt-[2rem] md:mt-[2rem] md:w-1/2 md:m-auto'
                        onFinish={createPin}
                        layout='vertical'>

                        <Form.Item
                            label="New Pin"
                            name="newPin"
                            rules={[{ required: true, message: 'Please enter a new Pin!' }]}
                        >
                            <Input.Password placeholder='****' />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Pin"
                            name="cNewPin"
                            rules={[{ required: true, message: 'Please confirm your Pin!' }]}
                        >
                            <Input.Password placeholder='****' />
                        </Form.Item>
                        <Form.Item>
                            <Button className='auth-button' block type="primary" htmlType="submit" loading={loading && true}>
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                )}
        </div>
    )
}

export default ChangePin