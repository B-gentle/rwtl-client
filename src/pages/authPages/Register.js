import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './auth.scss';
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png';
import googleIcon from '../../assets/icons/google-icon.svg';
import { RegisterUser } from '../../services/usersApiCall';
import { getPackages } from '../../services/packageCall';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { LOG_IN_USER } from '../../redux/features/user/userSlice';
import EmptyAndSearch from '../../components/EmptyAndSearch';
import Loader from '../../components/Loader';

const Register = () => {

  const loading = useSelector(selectLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {Option} = Select;

  const [packages, setPackages] = useState(null)

  const options = ["+234", "+197", "+911", "+235"]

  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    const { countryCode, phoneNo, password, confirmPassword } = values;
    values.phoneNo = countryCode + phoneNo;
    if (password < 5 & password > 10) {
      dispatch(SET_ERROR())
    return  message.error("Password must be greater than 4 characters and less than 10 Characters")
    }

    if(password !== confirmPassword){
      dispatch(SET_ERROR())
     return message.error("Password does not match") 
    }
    try {
      const response = await RegisterUser(values)
      if (response.status === 201) {
        message.success(response.message)
        dispatch(SET_SUCCESS());
        dispatch(LOG_IN_USER(true))
        navigate("/dashboard")
      } else {
        const message =
          (response && response.data && response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(SET_ERROR());
    }
  };

  const handlePackageList = async() => {
    try{
      const response = await getPackages()
      setPackages(response.data.data)
      if(response.status !== 200){
        const message =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    }catch(error){
      message.error(error.message)
    }
    
  }

  // useEffect(() => {
  //   const token = getCookie("token");
  //   if (token) {
  //     navigate("/dashboard")
  //   }
  // }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='md:bg-primary pt-3 pb-2'>
        <img className='auth-img center-item mx-auto md:max-w-full md:h-auto' src={logo} alt='company-logo' />
      </div>

      <div className='center-item h-screen sign-up-auth'>
        {loading && <Loader />}
        <div className='main-div'>
          <div className='auth-text'>
            <h1>Sign Up</h1>
            <span>Create an account.</span>
          </div>

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
              label="Referral Code"
              name="referralCode"
              rules={[
                {
                  required: true,
                  message: 'Please input referral code!',
                },
              ]}
            >
              <Input placeholder="Referral Code" />
            </Form.Item>

            <div className='flex items-center'>
            <Form.Item
            className='mr-4'
              name="countryCode"
            >
                <Select defaultValue="+234" options={options.map((option) => ({ label: option, value: option }))} />
            </Form.Item>

            <Form.Item
            className='flex-grow'
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
            </div>

            <Form.Item
            label="Select Package"
            name="package"
              >
              <Select defaultValue="Select Package"
              notFoundContent= {<EmptyAndSearch text="Please wait...." />}
              onClick={handlePackageList}>
              {packages && packages.map((option) => (
        <Option key={option._id} value={option._id}>
          {option.name}
        </Option>
      ))}
                </Select>
            </Form.Item>

            <Form.Item>
              <Button className='auth-button' type="primary" htmlType="submit" block>
                {loading ? "loading" : "Signup"}
              </Button>
            </Form.Item>
            <div className="flex items-center auth-divider mb-54">
              <hr className='hr mr-4 w-full' />
              <span>Or</span>
              <hr className=' hr ml-4 w-full' />
            </div>

            <div className="flex items-center border border-solid border-black-300 flex justify-center p-2 google-sign-in">
              <img src={googleIcon} alt='google-icon' />
              <span className='ml-1'>Sign Up with Google</span>
            </div>

            <span className='flex justify-center pb-[99px]'><span className='mr-2'>Already have an account?</span> <Link to="/">Sign In</Link></span>
          </Form>
        </div>
      </div>
    </div >
  )
}

export default Register