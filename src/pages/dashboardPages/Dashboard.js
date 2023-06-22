import { Badge, Card, Popover } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectUserData } from '../../redux/features/user/userSlice';
import sendIcon from '../../assets/icons/dashboard_icons/send.svg';
import { MdAddIcCall, MdSignalCellularConnectedNoInternet1Bar, MdGridView } from 'react-icons/md';
import { FaSatelliteDish } from 'react-icons/fa';
import { FinancialCards, IncentiveProgress, PortfolioDownlines, RecentTransactions } from '../../components/DashbardComponents';
import { Chart } from './portfolio/portfolioChart';
import { format } from 'date-fns';
import Welcome from '../../components/Welcome';
import notification from '../../assets/icons/notification.svg';
import profileIcon from '../../assets/icons/profile-pic-icon.svg';
import pvIcon from '../../assets/icons/dashboard_icons/pv-icon.svg';
import { Link } from 'react-router-dom';
import DateRange from './DateRange';
import { FaWallet } from 'react-icons/fa';

const Dashboard = () => {

    const user = useSelector(selectUserData);
    const date = new Date()
    const todayDate = format(date, 'dd, MMM yyyy')
    const time = format(date, 'hh: mm a')
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [showNotification, setShowNotification] = useState(true)

    const pop = (
        <div className='flex flex-col gap-[1rem] bg-[#926f34] text-white p-[1rem] rounded-md'>
            <FaWallet size={32} />
            <span className='font-medium text-base'>Wallet Balance:</span>
            <span className='font-bold text-2xl'>₦{user.walletBalance}</span>
        </div>
    )

    return (
        <div className='dashboard'>
            {isMobile && (<div className='flex md:flex-row justify-between mt-[1rem] mb-[28px]'>
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
                    <div className='flex flex-wrap justify-between'>
                    <Popover content={pop} title="Full Balance">
                        <div className='flex flex-col gap-[1rem] bg-[#926f34] text-white w-[45%] md:w-[30%] p-[1rem] rounded-md'>
                            <FaWallet size={32} />
                            <span className='font-medium text-base'>Wallet Balance:</span>
                            <span className='font-bold text-2xl truncate'>₦{user.walletBalance}</span>
                        </div>
                        </Popover>
                        <div className='flex flex-col gap-[1rem] bg-[#b88a44] text-white w-[50%] md:w-[30%] p-[1rem] rounded-md'>
                            <FaWallet size={32} />
                            <span className='font-medium text-base'>Total Commission Earned:</span>
                            <span className='font-bold text-2xl'>₦{(user.commissionBalance).toFixed(2)}</span>
                        </div>
                        <div className='flex flex-col gap=[1rem] bg-[#855424] mt-[10px] text-white w-[100%] md:w-[30%] p-[1rem] rounded-md'>
                            <span className='flex justify-between md:flex-col md:mt-[10px]'>
                                <span>
                                    <FaWallet size={32} />
                                </span>
                                <Link to='/withdrawcommission'>
                                    <button className='bg-[#faf398] text-green p-[8px] border-none rounded-md'>Transfer Commission
                                    </button>
                                </Link>
                            </span>
                            <span className='font-medium text-base'>Commission Balance:</span>
                            <span className='font-bold text-2xl'>₦{(user.withdrawableCommission).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className='flex flex-wrap md:flex-no-wrap md:gap-[1rem] financial-cards-container'>
                        <Link to='/buyairtime' className='w-[40%] md:w-[100px] md:h-[80px] md:mt-[20px] md:text-white'>
                            <FinancialCards text="Airtime" Icon={<MdAddIcCall size={32} />} />
                        </Link>
                        <Link to='/buydata' className='w-[40%] md:w-[100px] md:h-[80px]  md:mt-[20px] md:text-white'>
                            <FinancialCards text="Data" Icon={<MdSignalCellularConnectedNoInternet1Bar size={32} />} />
                        </Link>
                        <Link to='/cable' className='w-[40%] md:w-[100px] md:h-[80px]  md:mt-[20px] md:text-white'>
                            <FinancialCards text="Cable" Icon={<FaSatelliteDish size={32} />} />
                        </Link>
                        <Link to='/more' className='w-[40%] md:w-[100px] md:h-[80px]  md:mt-[20px] md:text-white'>
                            <FinancialCards text="More" Icon={<MdGridView size={32} />} />
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