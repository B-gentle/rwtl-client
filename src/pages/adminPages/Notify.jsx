import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import BackArrowHeading from '../../components/BackArrowHeading';
import { Message } from '../../services/adminCalls';
import { SET_ERROR, SET_LOADING, SET_SUCCESS, selectLoading } from '../../redux/features/processingStates/processStatesSlice';
import { useDispatch, useSelector } from 'react-redux';

const Notify = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading)
  const { TextArea } = Input

  const isMobile = useMediaQuery({ query: '(max-width: 748px)' })


  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    try {
      const response = await Message(values)
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        message.success('Sent')
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
      form.resetFields();
      message.error(error.message)
    }
  }

  return (
    <div className='p-[1rem]'>
      <BackArrowHeading title='Notify Users' link='admin' />
        <Form
          onFinish={onFinish}
          form={form}
          layout='vertical'
          className='mt-[4rem]'
        >
          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: 'Please write a message!',
              },
            ]}
          >
            <TextArea rows={6} />
          </Form.Item>

          <Form.Item
          >
            <Button type="primary" htmlType="submit" block
              loading={loading ? true : false}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
  )
}

export default Notify