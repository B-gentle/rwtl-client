import React from 'react';
import { useSelector } from 'react-redux';
import { IncentiveProgress, PortfolioDownlines } from '../../../components/DashbardComponents'
import { Chart, DoughnutChart } from './portfolioChart'
import './portfolio.scss';
import { selectUserData } from '../../../redux/features/user/userSlice';
import pvIcon from '../../../assets/icons/dashboard_icons/pv-icon.svg';

const Portfolio = () => {

    const user = useSelector(selectUserData)
    const progress1 = ((parseFloat(user.pv) / parseFloat(10000)) * 100).toFixed(2);
    const progress2 = ((parseFloat(user.pv) / parseFloat(30000)) * 100).toFixed(2);
    return (
        <div className='portfolio'>
            <h4>Portfolio</h4>
            <div className='flex flex-col bg-[green] text-white p-[1rem] gap-[1rem] mb-[2rem]'>
                <span>Commission Earned:</span>
                <span className=''>{user?.commissionBalance}</span>
            </div>
            <Chart />
            <PortfolioDownlines user={user} />
            <div>
                <span className='flex items-center mb-[16px] mt-[32px]'>
                    <img className='mr-4' src={pvIcon} alt="icon" />
                    <span className='flex justify-center items-center gap-[2px] pv-span'>
                        <span>{user.pv}</span>
                        <span>PV</span>
                    </span>
                </span>
                <span className='flex justify-between'>
                    <IncentiveProgress title="Monthly Allowance" value={`${user.pv} of 30000PV`} progress={progress1} />
                    <IncentiveProgress title="Incentive" value={`${user.pv} of 30000PV`} progress={progress2} />
                </span>
            </div>
            <DoughnutChart user={user} />
        </div>
    )
}

export default Portfolio