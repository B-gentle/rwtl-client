import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { credituser } from '../../services/adminCalls';

const CreditWallet = () => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const onFinish = async (values) => {
        dispatch(SET_LOADING());
        try {
            const response = await credituser(values)
            if (response.status === 200) {
                dispatch(SET_SUCCESS());
                message.success(response.data.message)
            } else {
                const message =
                    (response.response && response.response.data && response.response.data.message) ||
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
        <div>
            <Form
                layout='vertical'
                onFinish={onFinish}

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a username!',
                        },
                    ]}
                >
                    <Input placeholder='Enter Username' />
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter an amount!',
                        },
                    ]}
                >
                    <Input placeholder='Enter an amount' />
                </Form.Item>


                <Form.Item
                >
                    <Button type="primary" htmlType="submit" block loading={loading && true}>
                        Credit User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreditWallet