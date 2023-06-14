import { Button, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getPendingRegistrations } from '../../services/adminCalls';
import './admin.scss';
import PendingUserDetails from './PendingUserDetails';

const CompleteRegistration = () => {
  const [pendingUsers, setPendingUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getPendingUsers()
  }, [])
  
  const getPendingUsers = async() => {
    try {
      const response = await getPendingRegistrations()
      if(response.status === 200){
   setPendingUsers(response.data.data)
      }else{
        message.error("Reload Page to get user data")
      }
    } catch (error) {
      message.error(error.message);
    }
   
  }

  const data = pendingUsers && pendingUsers.map((user, id) => ({
    ...user,
    key: user._id,
    package: user?.package?.name 
  }))

  const handleView = (record) => {
    setSelectedUser(record);
  };


  const renderAction = (_, record) => (
    <div>
      <Button onClick={() => handleView(record)}>View</Button>
    </div>
  );

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package',
    },
    {
      title: 'Action',
      key: 'action',
      render: renderAction,
    },
  ]

  return (
    <div>
      <h3>View Pending users</h3>
      {selectedUser ? (<PendingUserDetails user={selectedUser} setSelectedUser={setSelectedUser}/>) : (<Table dataSource={data} columns={columns} />)}
      
        
    </div>
  )
}

export default CompleteRegistration