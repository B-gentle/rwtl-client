import { Space } from 'antd';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Dashboard from '../../pages/dashboardPages/Dashboard';
import Downlines from '../../pages/dashboardPages/Downlines';
import ChangePassword from '../../pages/dashboardPages/settings/ChangePassword';
import Profile from '../../pages/dashboardPages/settings/Profile';
import Settings from '../../pages/dashboardPages/settings/Settings';
import Transactions from '../../pages/dashboardPages/Transactions';
import '../layouts/layouts.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Portfolio from '../../pages/dashboardPages/portfolio/Portfolio';
import SendMoney from '../../pages/financePages/SendMoney';
import Withdraw from '../../pages/financePages/Withdraw';
import Topup from '../../pages/financePages/Topup';
import More from '../../pages/financePages/More';
import BuyAirtime from '../../pages/financePages/BuyAirtime';
import BuyData from '../../pages/financePages/BuyData';
import Referrals from '../../pages/dashboardPages/settings/Referrals';
import AddDownlineUser from '../../pages/financePages/AddDownlineUser';
import Cable from '../../pages/financePages/Cable';
import Electricity from '../../pages/financePages/Electricity';
import PackageUpgrade from '../../pages/financePages/PackageUpgrade';
import Exams from '../../pages/financePages/Exams';

const Contents = () => {
    
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return (
        <div className='layout'>
            <Sidebar />
            <div className='layout-content'>
          {!isMobile &&  <Header /> }
            <div className="pages">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profiles" element={<Profile />} />
                    <Route path="packageupgrade" element={<PackageUpgrade/>} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="downlines" element={<Downlines />} />
                    <Route path='change-password' element={<ChangePassword />} />
                    <Route path='referrals' element={<Referrals/>} />
                    <Route path='sendmoney' element={<SendMoney />} />
                    <Route path='withdraw' element={<Withdraw />} />
                    <Route path='topup' element={<Topup />} />
                    <Route path="more" element={<More />} />
                    <Route path='buyairtime' element={<BuyAirtime />} />
                    <Route path="buydata" element={<BuyData />} />
                    <Route path='cable' element={<Cable />} />
                    <Route path='electricity' element={<Electricity />} />
                    <Route path='exams' element={<Exams />} />
                    <Route path="adddownline" element={<AddDownlineUser/>} />
                </Routes>
                </div>
            </div>
        </div>
    )
}

export default Contents