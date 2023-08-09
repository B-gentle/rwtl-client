import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaWallet, FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings, MdSettings } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOG_OUT_USER, selectUserData } from '../../redux/features/user/userSlice';
// import {  } from '../../redux/features/processingStates/processStatesSlice';
import { logoutAdmin } from '../../services/adminCalls';

const AdminDashboard = () => {

  const admin = useSelector(selectUserData)
  const [subMenu, setSubMenu] = useState({
    admin: false,
    finance: false,
    reports: false,
    users: false,
    settings: false
  })

  const showSubMenu = (dropDownName) => {
    setSubMenu((prevState) => ({
      ...prevState,
      [dropDownName]: !prevState[dropDownName],
    }));
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logUserOut = async () => {
    await logoutAdmin();
    dispatch(LOG_OUT_USER(false));
    navigate("/super");
  }
  return (
    <div className='flex flex-col gap-[1rem] admin-dashboard'>
      <div className="bg-[#ae8625] py-4 px-6 text-white text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Welcome {admin.username}</h1>
      </div>
      <div className='flex flex-wrap gap-[1rem] justify-center'>
        <div className='bg-[#E0AA3E] text-white p-[1rem]'>Total Users: </div>
        <div className='bg-[#392C23] text-white p-[1rem]'>Total Admin: </div>
        <div className='bg-[#392C23] text-white p-[1rem] flex flex-col gap-[1rem]'>
          <section className='flex gap-[1rem]'>
            <span className='font-[600] text-[#ddbc22] text-[1rem]'>Full Name:</span>
            <span>{admin.fullname}</span>
          </section>
          <section className='flex gap-[3rem]'>
            <span className='font-[600] text-[#ddbc22] text-[1rem]'>ROLE:</span>
            <span className='uppercase'> {admin.role}</span>
          </section>

        </div>
      </div>
      <section className='p-[1rem] flex flex-col gap-[1rem]'>
        <div className='text-[#ffffff] text-[1.2rem] font-[600] bg-[#ae8625] rounded-[4px] p-[1rem]'>
          <div className='flex justify-between items-center' onClick={() => { showSubMenu('admin') }}>
            <span className='flex gap-[1rem]'>
              <span><MdAdminPanelSettings /></span>Admin</span>
            <span>{subMenu.admin ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}</span>
          </div>
          {subMenu.admin && (<div className='flex flex-col gap-[1rem] mt-[1rem]'>
            <Link to='/admin/addadmin' className='no-underline text-[#ffffff] text-[1rem]'>Add Admin</Link>
            <Link to='/admin/addadmin' className='no-underline text-[#ffffff] text-[1rem]'>Delete Admin</Link>
            <Link to='/admin/addadmin' className='no-underline text-[#ffffff] text-[1rem]'>Edit Admin</Link>
          </div>)}
        </div>

        <div className='text-[#ffffff] text-[1.2rem] font-[600] bg-[#ae8625] rounded-[4px] p-[1rem]'>
          <div className='flex justify-between items-center' onClick={() => { showSubMenu('finance') }}>
            <span className='flex gap-[1rem]'>
              <span><FaWallet /></span>
              <span>Finance</span>
            </span>
            <span>{subMenu.finance ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}</span>
          </div>
          {subMenu.finance && (<div className='flex flex-col gap-[1rem] mt-[1rem]'>
            <Link to='/admin/approvepayment' className='no-underline text-[#ffffff] text-[1rem]'>Approve Payment</Link>
            <Link to='/admin/creditwallet' className='no-underline text-[#ffffff] text-[1rem]'>Credit Wallet</Link>
          </div>)}
        </div>

        <div className='text-[#ffffff] text-[1.2rem] font-[600] bg-[#ae8625] rounded-[4px] p-[1rem]'>
          <div className='flex justify-between items-center' onClick={() => { showSubMenu('users') }}>
            <span className='flex gap-[1rem]'>
              <span><FaUser /></span>
              <span>User Administration</span>
            </span>
            <span>{subMenu.users ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}</span>
          </div>
          {subMenu.users && (<div className='flex flex-col gap-[1rem] mt-[1rem]'>
            <Link to='/admin/viewuser' className='no-underline text-[#ffffff] text-[1rem]'>View User</Link>
            <Link to='/admin/changeusername' className='no-underline text-[#ffffff] text-[1rem]'>Change Username</Link>
            <Link to='/admin/message' className='no-underline text-[#ffffff] text-[1rem]'>Message</Link>
          </div>)}
        </div>

        <div className='text-[#ffffff] text-[1.2rem] font-[600] bg-[#ae8625] rounded-[4px] p-[1rem]'>
          <div className='flex justify-between items-center' onClick={() => { showSubMenu('reports') }}>
            <span className='flex gap-[1rem]'>
              <span><TbReportMoney /></span>
              <span>Reports</span>
            </span>
            <span>{subMenu.reports ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}</span>
          </div>
          {subMenu.reports && (<div className='flex flex-col gap-[1rem] mt-[1rem]'>
            <Link to='/admin/viewtransactions' className='no-underline text-[#ffffff] text-[1rem]'>Transaction Details</Link>
            <Link to='/admin/viewqualifiedusers' className='no-underline text-[#ffffff] text-[1rem]'>Verify Qualified Users</Link>
          </div>)}
        </div>

        <div className='text-[#ffffff] text-[1.2rem] font-[600] bg-[#ae8625] rounded-[4px] p-[1rem]'>
          <div className='flex justify-between items-center' onClick={() => { showSubMenu('settings') }}>
            <span className='flex gap-[1rem]'>
              <span><MdSettings /></span>
              <span>Settings</span>
            </span>
            <span>{subMenu.settings ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}</span>
          </div>
          {subMenu.settings && (<div className='flex flex-col gap-[1rem] mt-[1rem]'>
            <Link to='/admin/change-Password' className='no-underline text-[#ffffff] text-[1rem]'>Change Password</Link>
          </div>)}
        </div>

        <div className='text-[#ffffff] text-[1.2rem] font-[600] bg-[#ae8625] rounded-[4px] p-[1rem]'>
          <p onClick={logUserOut} className='cursor-pointer text-[#ffffff]'>Logout</p>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard