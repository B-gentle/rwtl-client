import { Badge, Card } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectUserData } from '../../redux/features/user/userSlice';
import sendIcon from '../../assets/icons/dashboard_icons/send.svg';
import withdrawIcon from '../../assets/icons/dashboard_icons/withdraw.svg';
import topUpIcon from '../../assets/icons/dashboard_icons/top-up.svg';
import moreIcon from '../../assets/icons/dashboard_icons/more.svg';
import { FinancialCards, IncentiveProgress, PortfolioDownlines, RecentTransactions } from '../../components/DashbardComponents';
import { Chart } from './portfolio/portfolioChart';
import { format } from 'date-fns';
import Welcome from '../../components/Welcome';
import notification from '../../assets/icons/notification.svg';
import profileIcon from '../../assets/icons/profile-pic-icon.svg';
import pvIcon from '../../assets/icons/dashboard_icons/pv-icon.svg';
import { MoreModal } from '../../components/FinanceModal';
import { Link } from 'react-router-dom';
import DateRange from './DateRange';
import { FaWallet } from 'react-icons/fa';

const Dashboard = () => {

    const user = useSelector(selectUserData);
    const date = new Date()
    const todayDate = format(date, 'dd, MMM yyyy')
    const time = format(date, 'hh: mm a')
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [moreModalContent, setMoreModalContent] = useState(null);
    const [activeSubContent, setActiveSubContent] = useState(null);
    const [showNotification, setShowNotification] = useState(true)

    const handleCardClick = (content) => {
        if (content === 'more') {
            setOpenModal(true);
            setModalContent(content);
            setMoreModalContent(null);
            setActiveSubContent(null);
        } else {
            setOpenModal(true);
            setModalContent(content)
        }
    };

    const handleMoreItemClick = (item) => {
        setMoreModalContent(item);
        setActiveSubContent(null);
    };

    const handleSubContentClick = (subContent) => {
        setActiveSubContent(subContent);
    };

    const handleOk = () => {
        setOpenModal(false);
        setModalContent(null)
        setMoreModalContent(null);
        setActiveSubContent(null);
    };

    const handleCancel = () => {
        setOpenModal(false);
        setModalContent(null);
        setMoreModalContent(null);
        setActiveSubContent(null);
    };


    return (
        <div className='dashboard'>
            {isMobile && (<div className='flex flex-col md:flex-row justify-between mt-[1rem] mb-[28px]'>
                <span className='flex items-center'>
                    <img className='w-[60px] h-[60px] mr-[8px]' src={profileIcon} alt='avatar' />
                    <Welcome user={user} />
                </span>
                <Badge dot={showNotification}>
                    <img src={notification} alt='notification' />
                </Badge>
            </div>)
            }
            <div className='hidden md:block'><Welcome user={user} /> </div>
            <div className='flex flex-col md:flex-row'>
                <Card className='card finance-card'>
                    <div className="flex justify-center md:flex-wrap flex-col md:space-x-6 space-y-3 balance-card">
                        <div className='flex md:w-[70%] w-full space-x-6'>
                            <div className='flex flex-col md:w-[200px] w-full md:gap-3 gap-[1rem] h-[auto] w-[50%] bg-[#926f34] text-white p-[1rem]'>
                                <FaWallet />
                                <span>Wallet Balance:</span>
                                <span>₦{user.walletBalance}</span>
                            </div>
                            <div className='flex flex-col md:w-[200px] w-full md:gap-3 gap-[1rem] h-[auto] w-[50%] bg-[#b88a44] text-white p-[1rem]'>
                                <FaWallet />
                                <span>Total Commission Earned:</span>
                                <span>₦{(user.commissionBalance).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='lg:w-[30%] w-full'>
                            <div className='flex flex-col md:gap-3 gap-[1rem] h-[auto] w-[100%] text-white bg-[#855424] p-[1rem]'>
                                <FaWallet />
                                <span>Commission Balance:</span>
                                <span>₦{(user.withdrawableCommission).toFixed(2)}</span>
                            </div>
                        </div>
                        {/* 
                        <main className='flex flex-col'>
                            <span>{todayDate}<br />{time}</span>
                            <span><br /><span></span></span>
                        </main> */}

                    </div>
                    <div className='flex financial-cards-container'>
                        <Link to='/sendmoney'>
                            <FinancialCards text="Send" icon={sendIcon} />
                        </Link>
                        <Link to='/withdraw'>
                            <FinancialCards text="Withdraw" icon={withdrawIcon} />
                        </Link>
                        <Link to='/topup'>
                            <FinancialCards text="Top Up" icon={topUpIcon} />
                        </Link>
                        <Link to='/more'>
                            <FinancialCards text="More" icon={moreIcon} />
                        </Link>
                    </div>
                </Card>

                <Card className='card downline-card hidden md:block'>
                    <Card className='mb-[16px]'>
                        <PortfolioDownlines user={user} />
                    </Card>
                    <Card>
                        <span className='flex items-center mb-5'>
                            <img className='mr-4' src={pvIcon} alt="icon" />
                            <span className='flex flex-col justify-center'>
                                <span>0</span>
                                <span>PV</span>
                            </span>
                        </span>
                        <span className='flex justify-between'>
                            <IncentiveProgress title="Monthly Allowance" value="0 of 10,000PV" />
                            <IncentiveProgress title="Incentive" value="0 of 30,000PV" />
                        </span>
                    </Card>
                </Card>
            </div>
            <div className='flex flex-col md:flex-row'>
                <Card className='card'>
                    <div>
                        <h1>Recent Transactions</h1>
                        <DateRange />
                    </div>

                    <RecentTransactions />
                </Card>

                <Card className='hidden md:block card'>
                    <Chart />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard