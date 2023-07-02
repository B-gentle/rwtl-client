import React, { useState } from 'react';
import { Form, Button, Input, Select, message, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADING, selectLoading, SET_SUCCESS, SET_ERROR } from '../../redux/features/processingStates/processStatesSlice'
import BackArrowHeading from '../../components/BackArrowHeading';
import { ViewUserTransactions } from '../../services/adminCalls';


const ViewTransaction = () => {

  const [userTransaction, setUserTransaction] = useState(null);
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const onFinish = async (values) => {
    try {
      dispatch(SET_LOADING())
      const response = await ViewUserTransactions({ username: values.username, transactionType: values.transactionType })
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        setUserTransaction(response.data.data)
      } else {
        const message =
          (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
      console.log(response)
    } catch (error) {
      dispatch(SET_ERROR())
      message.error(error.message)
    }
  }


  const columns = [
    {
      title: 'Network',
      dataIndex: 'network',
      key: 'network',
    },

    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
    },
    {
      title: 'Receiver',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <div className='p-[1rem]'>
      <BackArrowHeading title="View User Transaction" link="admin" />
     { !userTransaction ? 
     (<Form
        className='mt-[1rem]'
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Transaction Type"
          name="transactionType"
          rules={[
            {
              required: true,
              message: 'Please select transaction type!',
            },
          ]}
        >

          <Select
            placeholder="Select Transaaction Type"
            options={[
              {
                value: 'airtime',
                label: 'Airtime',
              },
              {
                value: 'data',
                label: 'Data',
              },
              {
                value: 'cableTv',
                label: 'Cable',
              },
              {
                value: 'commissionTransfer',
                label: 'Commission Transfer',
              },
              {
                value: 'fundTransfer',
                label: 'Fund Transfer',
              },
              {
                value: 'electricity',
                label: 'Electricity',
              },
              {
                value: 'upgrade',
                label: 'Upgrade',
              },
              {
                value: 'exams',
                label: 'Exams',
              },
            ]}
          />

        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit" block loading={loading && true}>
            Submit
          </Button>
        </Form.Item>
      </Form>) : (
        <Table dataSource={userTransaction} columns={columns} />
      )}
    </div>
  )
}

export default ViewTransaction