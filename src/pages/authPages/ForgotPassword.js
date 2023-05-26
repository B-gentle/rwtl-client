import React from 'react'
import { Card, Form, Input, Button } from 'antd';
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png'
import './auth.scss';

const ForgotPassword = () => {
    return (
        <div className='auth-card-div center-item h-screen'>
            <Card className='auth-card flex items-center justify-center'>
                <img className='auth-logo' src={logo} alt='company-logo' />
                <div className='auth-text'>
                    <span>Forgot Password</span>
                    <span>Enter your email address below. We'll send a link to reset your password.</span>
                </div>
                <Form
                layout='vertical'>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item>
                        <Button className='auth-button' block type="primary" htmlType="submit">
                        Send Link
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    )
}

export default ForgotPassword