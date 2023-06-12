import React from 'react';
import { useSelector } from 'react-redux';
import { IncentiveProgress, PortfolioDownlines } from '../../../components/DashbardComponents'
import { Chart, DoughnutChart } from './portfolioChart'
import './portfolio.scss';
import { selectUserData } from '../../../redux/features/user/userSlice';
import pvIcon from '../../../assets/icons/dashboard_icons/pv-icon.svg';

const Portfolio = () => {

    const user = useSelector(selectUserData)
    return (
        <div className='portfolio'>
            <h4>Portfolio</h4>
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
                    <IncentiveProgress title="Monthly Allowance" value="0 of 10,000PV" />
                    <IncentiveProgress title="Incentive" value="0 of 30,000PV" />
                </span>
            </div>
            <DoughnutChart user={user} />
        </div>
    )
}

export default Portfolio