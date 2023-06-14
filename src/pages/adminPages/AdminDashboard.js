import React from 'react'
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  return (
    <div className='flex flex-col gap-[1rem]'>
        <Link to='/admin/addadmin'>Add Admin</Link>
        <Link to='/admin/approvepayment'>Approve Payment</Link>
        <Link to='/admin/creditwallet'>Credit Wallet</Link>
    </div>
  )
}

export default AdminDashboard