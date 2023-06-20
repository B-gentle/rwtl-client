import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './auth.scss';
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png';
import { LoginUser } from '../../services/usersApiCall';
import googleIcon from '../../assets/icons/google-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectSuccess, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { LOG_IN_USER, LOG_OUT_USER } from '../../redux/features/user/userSlice';

const Login = () => {

  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    try {
      const response = await LoginUser(values)
      if (response.status === 200) {
         dispatch(LOG_IN_USER(true))
         dispatch(SET_SUCCESS());
        navigate('/dashboard');
        message.success("user logged in successfully")
      } else {
        const message =
          (response.data && response.data.message ) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      dispatch(SET_ERROR())
      dispatch(LOG_OUT_USER(false));
      message.error(error.message)
    }
  };

  // useEffect(() => {
  //  if(localStorage.getItem("userData")){
  //    navigate('/dashboard')
  //  }
  // }, []);



  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='md:bg-primary'>
        <Link to="/">
        <img className='auth-img center-item mx-auto md:max-w-full md:h-auto' src={logo} alt='company-logo' />
        </Link>
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
                  message: 'Please enter your username!',
                },
              ]}
            >
              <Input placeholder="username" />
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
              <Button className='auth-button' type="primary" htmlType="submit" block loading={loading && true}>
                Sign In
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