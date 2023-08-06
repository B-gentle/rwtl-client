import React, { useState } from 'react';
import { message, Table, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {BiArrowBack} from 'react-icons/bi';
import { SET_LOADING, selectLoading, SET_SUCCESS, SET_ERROR } from '../../redux/features/processingStates/processStatesSlice'
import { ViewUserTransactions } from '../../services/adminCalls';
import AdminViewByUser from '../dashboardPages/transactions/AdminViewByUser';
import AdminViewByTransType from '../dashboardPages/transactions/AdminViewByTransType';
import AdminViewByTransDate from '../dashboardPages/transactions/AdminViewByTransDate';
import './admin.scss';


const ViewTransaction = () => {

  const [userTransaction, setUserTransaction] = useState(null);
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const onFinish = async (values, formName) => {

    try {
      dispatch(SET_LOADING())
      const response = await ViewUserTransactions({ username: values.username, option: formName, transactionType: values.transactionType, from: values.from, to: values.to })
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
    } catch (error) {
      dispatch(SET_ERROR())
      message.error(error.message)
    }
  }
  

  const onChangeTab = () => {
    setUserTransaction(null)
  }


  const items = [
    {
      key: 'username-view',
      label: `View by Username`,
      children: <AdminViewByUser onFinish={onFinish} loading={loading} formName='username' />,
    },
    {
      key: 'transactionType-view',
      label: `View by Transaction Type`,
      children: <AdminViewByTransType onFinish={onFinish} loading={loading} formName='transactionType' />,
    },
    {
      key: 'transactionDate-view',
      label: `View by Transaction date`,
      children: <AdminViewByTransDate onFinish={onFinish} loading={loading} formName='createdAt' />,
    },
  ];

  const transactions = userTransaction?.map((transaction, id) => {
    return {
      ...transaction,
      user: transaction.user?.username,
      key: transaction._id
    }
  }
  )


  const generateColumns = (transType) => {

  let columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user'
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

    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (dateString) => {
        const formattedDate = format(new Date(dateString), 'dd MMM yyyy hh:mm:ss a');
        return <span>{formattedDate}</span>;
      },
    },
    
  ];

  if(transType === 'cableTv'){
    columns.push(
      {
        title: 'Cable Company',
        dataIndex: 'cableCompany',
        key: 'cableCompany'
      },
    )
  }else if (transType === 'airtime' || transType === 'data'){
    columns.push(
      {
        title: 'Network',
        dataIndex: 'network',
        key: 'network',
        render: (networkCode) => {
          switch (networkCode) {
            case '01':
              return 'MTN';
            case '02':
              return 'Glo';
              case '03':
                return '9mobile';
                case '04':
              return 'Airtel';
            default:
              return 'Nil';
          }
        }
      },
    )
  
  }else if(transType === 'fundTransfer'){
    columns.push(
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
    )
  }

  return columns
}

  return (
    <div className='p-[1rem] h-[100%] admin-transaction'>
      <div className='flex items-center gap-[4rem] md:gap-[38rem] mt-[1.2rem] back-arrow-heading'>
        <Link to='/admin'><BiArrowBack size={32} color='black' /></Link>
        <h2 className='text-[1.3rem] font-[600]'>View Transactions</h2>
    </div>
      <Tabs defaultActiveKey="username-view" items={items} onChange={onChangeTab} className='mt-[3rem]' />
      {userTransaction &&
        <Table dataSource={transactions} columns={generateColumns(transactions[0]?.transactionType)} scroll={{ x: true }} />
      }
    </div>
  )
}

export default ViewTransaction