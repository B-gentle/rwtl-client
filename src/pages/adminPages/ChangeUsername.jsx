import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import BackArrowHeading from '../../components/BackArrowHeading';
import loaderIcon from '../../assets/images/loadingRings.gif';
import { EditUserUsername, getFullName } from '../../services/adminCalls';
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { useDispatch } from 'react-redux';

const ChangeUsername = () => {

    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const [fullName, setFullName] = useState(null);
    const dispatch = useDispatch();

    const showName = async (e) => {
        setLoader(true)
        try {
          let username = e.target.value
          const response = await getFullName({ username })
          if (response.status === 200) {
            setLoader(false)
            setFullName(response.data)
          } else {
            const message =
              (response.response && response.response.data && response.response.data.message) ||
              response.message ||
              response.toString();
            throw new Error(message)
          }
    
        } catch (error) {
          setLoader(false)
          setFullName(null)
          message.error(error.message)
        }
    
      }

      const onFinish = async (values)=> {
        dispatch(SET_LOADING())
        try {
          const response = await EditUserUsername(values)
          if (response.status === 200) {
            dispatch(SET_SUCCESS())
            message.success('Username Changed Successfully')
            setFullName(null);
            form.resetFields();
          } else {
            const message =
              (response.response && response.response.data && response.response.data.message) ||
              response.message ||
              response.toString();
            throw new Error(message)
          }
        } catch (error) {
          dispatch(SET_ERROR())
          setFullName(null)
          form.resetFields();
          message.error(error.message)
        }
      }

  return (
    <div className='p-[1rem]'>
        <BackArrowHeading title='Change Username' link='admin' />
        <Form
          onFinish={onFinish}
          form={form}
          className='my-[1rem]'
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input a username!',
              },
            ]}
          >
            <Input onBlur={showName} />
          </Form.Item>

          <div className='flex justify-center'>
            {loader ? <img className='w-[50px] h-[50px] rounded-[100px]' src={loaderIcon} alt='' /> :
              <p>{fullName}</p>}
          </div>

          <Form.Item
            label="New Username"
            name="newUsername"
            rules={[
              {
                required: true,
                message: 'Please input a username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
          >
            <Button type="primary" htmlType="submit" block disabled={fullName === null ? true : false}>
              Save Changes
            </Button>
          </Form.Item>
          </Form>
    </div>
  )
}

export default ChangeUsername