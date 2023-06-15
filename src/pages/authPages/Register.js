import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './auth.scss';
import logo from '../../assets/images/RWT_LOGO-removebg-preview.png';
import googleIcon from '../../assets/icons/google-icon.svg';
import { getPackages } from '../../services/packageCall';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { LOG_IN_USER } from '../../redux/features/user/userSlice';
import EmptyState from '../../components/EmptyState';
import MakePayment from './MakePayment';
import { checks } from '../../services/usersApiCall';

const Register = () => {

  const loading = useSelector(selectLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { Option } = Select;

  const [packages, setPackages] = useState(null)
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    // Check if the referral link parameter is present in the URL
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('referralCode');

    if (referralCode) {
      // Prefill the referral link input field
      form.setFieldsValue({ referralCode });
    }
  }, [location.search]);

  if (showPayment) {
    return <MakePayment formData={formData} setShowPayment={setShowPayment} setFormData={setFormData} packages={packages} />
  }

  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    const { passkey, confirmPasskey, email, username } = values;
    if (passkey < 5 & passkey > 10) {
      dispatch(SET_ERROR())
      return message.error("Password must be greater than 4 characters and less than 10 Characters")
    }

    if (passkey !== confirmPasskey) {
      dispatch(SET_ERROR())
      return message.error("Password does not match")
    }
    try {
      const dataAlreadyExist = await checks({email, username})
      if(dataAlreadyExist.status === 200){
        dispatch(SET_SUCCESS());
        const selectedPackage = packages.find((pkg) => pkg._id === values.package);
        const updatedFormData = { ...values, packageAmount: selectedPackage?.amount };
        setFormData(updatedFormData);
        setShowPayment(true);
      }else{
        const message =
            (dataAlreadyExist.response && dataAlreadyExist.response.data && dataAlreadyExist.response.data.message) ||
            dataAlreadyExist.message ||
            dataAlreadyExist.toString();
          throw new Error(message)
      }
    } catch (error) {
      dispatch(SET_ERROR())
      message.error(error.message)
    }
   
  }

  const handlePackageList = async () => {
    try {
      const response = await getPackages()
      setPackages(response.data.data)
      if (response.status !== 200) {
        const message =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      message.error(error.message)
    }

  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='md:bg-primary pt-3 pb-2'>
        <Link to='/'>
          <img className='auth-img center-item mx-auto md:max-w-full md:h-auto' src={logo} alt='company-logo' />
        </Link>
      </div>

      <div className='center-item h-screen sign-up-auth'>
        <div className='main-div'>
          <div className='auth-text'>
            <h1>Sign Up</h1>
            <span>Create an account.</span>
          </div>

          <Form
            form={form}
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
              name="passkey"
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
              name="confirmPasskey"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {location.search.includes('referralCode') ?
              (<Form.Item
                label="Referral Code"
                name="referralCode"
              >
                <Input disabled placeholder="Referral Code" />
              </Form.Item>) : (<Form.Item
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
              </Form.Item>)
            }

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
                Signup
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

            <span className='flex justify-center pb-[99px]'><span className='mr-2'>Already have an account?</span> <Link to="/login">Sign In</Link></span>
          </Form>
        </div>
      </div>
    </div >
  )
}

export default Register