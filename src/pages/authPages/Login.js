import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import './auth.scss';
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png';
import { LoginUser } from '../../services/usersApiCall';
import googleIcon from '../../assets/icons/google-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectSuccess, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';

const Login = () => {

  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    try {
      const response = await LoginUser(values)
      console.log(response)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data)
        message.success("user logged in successfully")
        dispatch(SET_SUCCESS());
        window.location.href='/dashboard';
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

  useEffect(() => {
    if (localStorage.getItem("token")){
      window.location.href="/dashboard"
  }
}, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='bg-primary'>
        <img className='center-item mx-auto max-w-full h-auto' src={logo} alt='company-logo' />
      </div>

      <div className='center-item h-screen login-auth'>
        <div className='main-div'>
          <div className='auth-text'>
            <h1>Sign In</h1>
            <span>Welcome back! Please enter your details.</span>
          </div>

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

            <Form.Item>
              <div className='flex justify-between items-center'>
                <Checkbox>Remember me</Checkbox>
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button className='auth-button' type="primary" htmlType="submit" block>
                {loading ?   'Loading' : 'Sign In'}
              </Button>
            </Form.Item>
            <div className="flex items-center auth-divider mb-54">
              <hr className='hr mr-4 w-full' />
              <span>Or</span>
              <hr className=' hr ml-4 w-full' />
            </div>

            <div className="flex items-center border border-solid border-black-300 flex justify-center p-2 google-sign-in">
              <img src={googleIcon} alt='google-icon' />
              <span className='ml-1'>Sign In with Google</span>
            </div>

            <span className='flex justify-center pb-[194px]'><span className='mr-2'>Don't have an account?</span> <Link to="/signup">Sign up</Link></span>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login