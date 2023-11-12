import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IncentiveProgress, PortfolioDownlines } from '../../../components/DashbardComponents'
import { Chart, DoughnutChart } from './portfolioChart'
import './portfolio.scss';
import { selectUserData } from '../../../redux/features/user/userSlice';
import { getNextIncentive } from '../../../services/usersApiCall';
import logo from '../../../assets/images/RWT_LOGO-removebg-preview.png'

const Portfolio = () => {

    const [nextIncentive, setNextIncentive] = useState(null)
    useEffect(() => {
        window.scrollTo(0, 0)
        const getIncentive = async () => {
            const response = await getNextIncentive()
            if (response.status === 200) {
                setNextIncentive(response.data.data[0])
            }
        }
        getIncentive()
    }, [])

    const user = useSelector(selectUserData)
    const progress1 = ((parseFloat(user.monthlyPv) / parseFloat(10000)) * 100).toFixed(2);
    const progress2 = ((parseFloat(user.pv) / parseFloat(30000)) * 100).toFixed(2);
    return (
        <div className='portfolio'>
            <h4>Portfolio</h4>
            <div className='flex justify-center flex-col items-center gap-[2px] bg-[#E6DCB1]'>
                <span className='multicolor-text'>EMBER PR<span><img src={logo} className='w-[25px] h-50' alt='' /></span>M<span><img src={logo} className='w-[25px] h-50' alt='' /></span></span>
                        <span className='text-[1.2rem]  font-[500]'>Promo PV</span>
                        <span className='text-[1.5rem] font-[400]'>Kickstarts on the</span>
                        <span>15th</span>
                    </div>
            {/* <Chart /> */}
            <div>
                <span className='flex items-center justify-center mb-[16px] mt-[32px] p-[1rem] bg-[#AE8625] text-white'>
                    <span className='flex justify-center flex-col items-center gap-[2px]'>
                        <span className='text-[1.2rem]  font-[500]'>Total PV</span>
                        <span className='text-[1.5rem] font-[400]'>{user.pv}</span>
                        <span>PV</span>
                    </span>
                </span>
                <span className='flex flex-col gap-[1rem] justify-center'>
                    {(user?.package?.name === "Platinum" || user?.package?.name === "Executive Platinum") && (<IncentiveProgress title="Monthly Allowance" value={`${user.monthlyPv} of 10000PV`} progress={progress1} />)}
                    <IncentiveProgress title={nextIncentive?.incentiveName} value={`${user.pv} of ${nextIncentive?.requiredPv}`} progress={progress2} />
                </span>
            </div>

            <PortfolioDownlines user={user} />
            <DoughnutChart user={user} />
        </div>
    )
}

export default Portfolio