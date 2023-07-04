import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOG_OUT_USER, selectUserData } from '../../redux/features/user/userSlice';
// import {  } from '../../redux/features/processingStates/processStatesSlice';
import { logoutAdmin } from '../../services/adminCalls';


const AdminDashboard = () => {
  
  const admin = useSelector(selectUserData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logUserOut = async () => {
    await logoutAdmin();
    dispatch(LOG_OUT_USER(false));
    navigate("/super");
}
  return (
    <div className='flex flex-col gap-[1rem]'>
      <div className="bg-[#ae8625] py-4 px-6 text-white text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Welcome {admin.username}</h1>
      </div>
      <div className='flex flex-wrap gap-[1rem] justify-center'>
        <div className='bg-[#E0AA3E] text-white p-[1rem]'>Total Users</div>
        <div className='bg-[#392C23] text-white p-[1rem]'>Total Admin</div>
      </div>
      <Link to='/admin/addadmin'>Add Admin</Link>
      <Link to='/admin/addadmin'>Delete Admin</Link>
      <Link to='/admin/approvepayment'>Approve Payment</Link>
      <Link to='/admin/creditwallet'>Credit Wallet</Link>
      <Link to='/admin/viewuser'>View User</Link>
      <Link to='/admin/viewtransactions'>Transaction Details</Link>
      <p onClick={logUserOut}>Logout</p>
    </div>
  )
}

export default AdminDashboard