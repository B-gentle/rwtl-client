import { Card, Statistic } from 'antd';
import React from 'react'
import packageIcon from '../../assets/icons/dashboard_icons/package-icon.svg';
import { selectUserData } from '../../redux/features/user/userSlice';
import { useSelector } from 'react-redux';
import sendIcon from '../../assets/icons/dashboard_icons/send.svg';
import withdrawIcon from '../../assets/icons/dashboard_icons/withdraw.svg';
import topUpIcon from '../../assets/icons/dashboard_icons/top-up.svg';
import moreIcon from '../../assets/icons/dashboard_icons/more.svg';
import downlineIcon from '../../assets/icons/dashboard_icons/downline-card-icon.svg';
import pvIcon from '../../assets/icons/dashboard_icons/pv-icon.svg';
import { Chart, FinancialCards, IncentiveProgress, RecentTransactions } from '../../components/DashbardComponents';
import { format } from 'date-fns';

const Dashboard = () => {
    const user = useSelector(selectUserData)
    const date = new Date()
    const todayDate = format(date, 'dd, MMM yyyy hh:mm a')
  
    return (
        <div className='dashboard'>
            <div className='flex flex-col md:flex-row justify-between pt-[32px] pb-[32px]'>
                <span className='greetings'>
                    <h5>Hello {user?.fullname}</h5>
                    <p>Welcome back<span className='hidden md:inline'>to RechargeWise</span></p>
                </span>
                <span>
                    <span className='package-name'>
                        <img src={packageIcon} alt='package-icon' />
                        <span>Package Name</span>
                    </span>
                </span>
            </div>
            <div className='flex flex-col md:flex-row'>
                <Card className='card'>
                    <div className="flex flex-col">
                        <span>Total balance</span>
                        <span className='flex justify-between'>
                            <span>Amount</span>
                            <span className='flex flex-wrap'>{todayDate}</span>
                        </span>
                    </div>
                    <div className='flex financial-cards-container'>
                        <FinancialCards text="Send" icon={sendIcon} />
                        <FinancialCards text="Withdraw" icon={withdrawIcon} />
                        <FinancialCards text="Top Up" icon={topUpIcon} />
                        <FinancialCards text="More" icon={moreIcon} />
                    </div>
                </Card>

                <Card className='card downline-card hidden md:block'>
                    <Card className='mb-[16px]'>
                        <span className='flex items-center'>
                            <img className='mr-2 mb-2' src={downlineIcon} alt='icon' />
                            <span>Downlines</span>
                        </span>
                        <span className="flex justify-between">
                            <Statistic title="Direct Referral Bonus" value="200" />
                            <Statistic title="Indirect Referral Bonus" value="200" />
                        </span>
                    </Card>
                    <Card>
                        <span className='flex items-center mb-5'>
                            <img className='mr-4' src={pvIcon} alt="icon"/>
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
                    <h1>Recent Transactions</h1>
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