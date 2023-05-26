import { Space } from 'antd';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/dashboardPages/Dashboard';
import Downlines from '../../pages/dashboardPages/Downlines';
import Settings from '../../pages/dashboardPages/Settings';
import Transactions from '../../pages/dashboardPages/Transactions';
import '../layouts/layouts.scss';
import Header from './Header';
import Sidebar from './Sidebar';

const Contents = () => {
    
    return (
        <div className='layout'>
            <Sidebar />
            <div className='layout-content'>
            <Header />
            <div className="pages">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="downlines" element={<Downlines />} />
                </Routes>
                </div>
            </div>
        </div>
    )
}

export default Contents