import { Badge, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { GET_TRANSACTIONS, selectUserData, selectTransaction } from '../../redux/features/user/userSlice';
import { MdAddIcCall, MdSignalCellularConnectedNoInternet1Bar, MdGridView } from 'react-icons/md';
import { FaSatelliteDish, FaWallet } from 'react-icons/fa';
import { FinancialCards, IncentiveProgress, PortfolioDownlines, RecentTransactions } from '../../components/DashbardComponents';
import { Chart } from './portfolio/portfolioChart';
import Welcome from '../../components/Welcome';
import notification from '../../assets/icons/notification.svg';
import profileIcon from '../../assets/icons/profile-pic-icon.svg';
import pvIcon from '../../assets/icons/dashboard_icons/pv-icon.svg';
import { Link } from 'react-router-dom';
import { getTransactions } from '../../services/transactionCalls';
import { getNextIncentive } from '../../services/usersApiCall';


const Dashboard = () => {

    const dispatch = useDispatch()
    const [nextIncentive, setNextIncentive] = useState(null)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions(); // Replace with your actual API endpoint
                dispatch(GET_TRANSACTIONS(response.data.data));
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        const getIncentive = async () => {
            const response = await getNextIncentive()
            if (response.status === 200) {
                setNextIncentive(response.data.data[0].incentiveName)
            }
        }
        fetchTransactions();
        getIncentive()
    }, [])

    const user = useSelector(selectUserData);
    const transactions = useSelector(selectTransaction);
    // const date = new Date()
    // const todayDate = format(date, 'dd, MMM yyyy')
    // const time = format(date, 'hh: mm a')
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [showNotification, setShowNotification] = useState(true)

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
                    <div className='flex flex-col md:flex-row md:flex-wrap justify-between'>
                        <div className='flex flex-col gap-[1rem] bg-[#926f34] text-white w-[100%] md:w-[30%] p-[1rem] rounded-md'>
                            <FaWallet size={32} />
                            <span className='font-medium text-base'>Wallet Balance:</span>
                            <span className='font-bold text-2xl truncate'>₦{user.walletBalance}</span>
                        </div>

                        <div className='flex flex-col gap-[1rem] bg-[#b88a44] text-white w-[100%] mt-[10px] md:w-[30%] p-[1rem] rounded-md'>
                            <FaWallet size={32} />
                            <span className='font-medium text-base'>Total Commission Earned:</span>
                            <span className='font-bold text-2xl truncate'>₦{(user.commissionBalance).toFixed(2)}</span>
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
                        { (user?.package?.name === "Platinum" ||  user?.package?.name === "Executive Platinum") && <IncentiveProgress title="Leadership Bonus" value={`${user.monthlyPv} of 10000PV`} />}
                            <IncentiveProgress title={nextIncentive} value={`${user.pv} of 25000PV`} />
                        </span>
                    </Card>
                </Card>
            </div>
            <div className='flex flex-col md:flex-row'>
                <Card className='card bg-[#D2AC47] text-white'>
                    <div className='flex justify-between items-center mb-[1rem]'>
                        <h1>Recent Transactions</h1>
                        <Link to='/transactions'>
                            <button className='rounded-md border-none bg-yellow-300 w-[70px]'>
                                View All
                            </button>
                        </Link>
                    </div>

                    <RecentTransactions transactions={transactions} />
                </Card>

                <Card className='hidden md:block card'>
                    <Chart />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard