import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {BiArrowBack} from 'react-icons/bi';
import { SET_LOADING, selectLoading, SET_SUCCESS, SET_ERROR } from '../../redux/features/processingStates/processStatesSlice'
import { GetQualifiedUsers, ViewUserTransactions } from '../../services/adminCalls';
import './admin.scss';


const ViewQualifiedUsers = () => {

    const getQualifiedUsers = async() => {
        const response = await GetQualifiedUsers()
        if (response.status === 200) {
            dispatch(SET_SUCCESS())
            setQualifiedUsers(response.data)
          } 
    }

    useEffect(() => {
     getQualifiedUsers();
    }, [])
    

  const [qualifiedUsers, setQualifiedUsers] = useState(null);
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const onFinish = async (values) => {

    try {
      dispatch(SET_LOADING())
      const response = await ViewUserTransactions({ username: values.username, transactionType: values.transactionType, from: values.from, to: values.to })
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
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

//   const transactions = userTransaction?.map((transaction, id) => {
//     return {
//       ...transaction,
//       user: transaction.user?.username,
//       key: transaction._id
//     }
//   }
//   )

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user'
    },

    {
      title: 'Award',
      dataIndex: 'incentiveName',
      key: 'incentiveName',
    },
    {
      title: 'Month Qualified',
      dataIndex: 'currentMonth',
      key: 'currentMonth',
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

  return (
    <div className='p-[1rem] h-[100%] qualified-users'>
      <div className='flex items-center gap-[4rem] md:gap-[38rem] mt-[1.2rem] back-arrow-heading'>
        <Link to='/admin'><BiArrowBack size={32} color='black' /></Link>
        <h2 className='text-[1.3rem] font-[600]'>Qualified Users</h2>
    </div>
      {qualifiedUsers &&
        <Table dataSource={qualifiedUsers} columns={columns} scroll={{ x: true }} />
      }
    </div>
  )
}

export default ViewQualifiedUsers