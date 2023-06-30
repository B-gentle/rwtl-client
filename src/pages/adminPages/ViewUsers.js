import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackArrowHeading from '../../components/BackArrowHeading'
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice'
import { ViewUser } from '../../services/adminCalls'

const ViewUsers = () => {
  const [details, setDetails] = useState(null)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const onFinish = async ({ username }) => {
    dispatch(SET_LOADING())
    try {
      const response = await ViewUser({ username })
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        form.resetFields();
        setDetails(response.data.data)
      }
      
    } catch (error) {
      dispatch(SET_ERROR());
      console.log(error)
    }

  }


  return (
    <div className='p-[1rem]'>
      <BackArrowHeading title="View User Details" link="admin" />
     {!details && <div>
      <Form className='flex flex-col items-center justify-center h-screen'
        onFinish={onFinish}
      >
        <Form.Item
          form={form}
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder='Type Username' />
        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit" block loading={loading && true}>
            {loading ? 'Getting User' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
      </div>}
      {details && <div>
        
        </div>}
     
    </div>
  )
}

export default ViewUsers