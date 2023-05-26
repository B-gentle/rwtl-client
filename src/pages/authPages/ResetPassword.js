import React from 'react'
import { Card, Form, Input, Button } from 'antd';
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png'
import './auth.scss';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className='auth-card-div center-item h-screen'>
            <Card className='auth-card flex items-center justify-center'>
                <img className='auth-logo' src={logo} alt='company-logo' />
                <div className='auth-text'>
                    <span>Please check your email</span>
                    <span>We sent a verication code to brightbeetech@gmail.com.</span>
                </div>
                <Form
                    layout='vertical'>
                    <Form.Item
                        name="reset-code"
                        rules={[{ required: true, message: 'Please input your reset code!' }]}
                    >
                        <div className='grid grid-cols-4 gap-4 reset-box'>
                        <Input  />
                        <Input  />
                        <Input />
                        <Input  />
                        </div>
        
                    </Form.Item>
                    <Form.Item>
                        <div className="grid grid-cols-2 gap-4">
                            <Button className="auth-button">Cancel</Button>
                            <Button className="auth-button" type='primary'>Verify</Button>
                        </div>
                    </Form.Item>
                    <span className='flex justify-center mt-45'>Didn't get a code?  <Link to="/signup">Resend Code</Link></span>

                </Form>
            </Card>
        </div>

    )
}

export default ForgotPassword