import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Dashboard from '../../pages/dashboardPages/Dashboard';
import Downlines from '../../pages/dashboardPages/Downlines';
import ChangePassword from '../../pages/dashboardPages/settings/ChangePassword';
import Profile from '../../pages/dashboardPages/settings/Profile';
import Settings from '../../pages/dashboardPages/settings/Settings';
import Transactions from '../../pages/dashboardPages/transactions/Transactions';
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
import WithdrawCommission from '../../pages/financePages/WithdrawCommission';
import CardPrinting from '../../pages/financePages/CardPrinting';
import TransactionDetails from '../../pages/dashboardPages/transactions/TransactionDetails';
import Jamb from '../../pages/financePages/Jamb';
import Waec from '../../pages/financePages/Waec';
import { getNotifications } from '../../services/usersApiCall';
import { changePassword } from '../../services/usersApiCall';
import Notifications from '../Notifications';
import ChangePin from '../../pages/dashboardPages/settings/ChangePin';

const Contents = () => {

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [displayNotifications, setDisplayNotifications] = useState(false)
    const [newNotification, setNewNotification] = useState(false)
    const [notifications, setShowNotification] = useState(null)

    useEffect(() => {
        const getnotifications = async () => {
            const response = await getNotifications()
            if (response.status === 200) {
                setShowNotification(response.data)
                setNewNotification(true)
            }
        }
        getnotifications();
    }, [])

    const readNotification = () => {

    }


    return (
        <div className='layout'>
            <Sidebar />
            <div className='layout-content relative'>
                {!isMobile && <Header displayNotifications={displayNotifications} setDisplayNotifications={setDisplayNotifications} newNotification={newNotification} setNewNotification={setNewNotification} />}
                {!isMobile && displayNotifications && <div className='absolute right-[0] z-50 w-[50%] h-screen p-[1rem] bg-[#ffffff]'>
                    <Notifications notifications={notifications} readNotification={readNotification} />
                </div>
                }

                <div className="pages">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard notifications={notifications} displayNotifications={displayNotifications} setDisplayNotifications={setDisplayNotifications} newNotification={newNotification} setNewNotification={setNewNotification} readNotification={readNotification} />} />
                        <Route path="transactions" element={<Transactions />} />
                        <Route path="transactions/:id" element={<TransactionDetails />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="profiles" element={<Profile />} />
                        <Route path="packageupgrade" element={<PackageUpgrade />} />
                        <Route path="portfolio" element={<Portfolio />} />
                        <Route path="downlines" element={<Downlines />} />
                        <Route path='change-password' element={<ChangePassword changePassword={changePassword} />} />
                        <Route path='change-pin' element={<ChangePin />} />
                        <Route path='referrals' element={<Referrals />} />
                        <Route path='sendmoney' element={<SendMoney />} />
                        <Route path='withdraw' element={<Withdraw />} />
                        <Route path='topup' element={<Topup />} />
                        <Route path="more" element={<More />} />
                        <Route path='buyairtime' element={<BuyAirtime />} />
                        <Route path="buydata" element={<BuyData />} />
                        <Route path='cable' element={<Cable />} />
                        <Route path='electricity' element={<Electricity />} />
                        <Route path='exams' element={<Exams />} />
                        <Route path='cardprinting' element={<CardPrinting />} />
                        <Route path="adddownline" element={<AddDownlineUser />} />
                        <Route path='withdrawcommission' element={<WithdrawCommission />} />
                        <Route path='jamb' element={<Jamb />} />
                        <Route path='waec' element={<Waec />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Contents