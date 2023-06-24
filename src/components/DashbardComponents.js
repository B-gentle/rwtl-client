import { Progress, Statistic } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import React from 'react';
import downlineIcon from '../assets/icons/dashboard_icons/downline-card-icon.svg';
import './components.scss';
import { transformTransaction } from '../services/transactionCalls';

export const FinancialCards = ({ Icon, text }) => {
    return (
        <div className='financialCards flex flex-col items-center justify-center bg-[#EDC967]'>
          {Icon}
            <span>{text}</span>
        </div>
    )
}

export const IncentiveProgress = ({ title, value, progress }) => {
    return (
        <div className='incentive-progress'>
            <h3>{title}</h3>
            <Progress percent={progress} />
            <small>{value}</small>
        </div>
    );
};

export const PortfolioDownlines = ({ user }) => {
    const downlines = user.downlines;
    const downlineCount = downlines.length;
    const directReferral = downlines.filter((downline, id) => downline.level === 1)
    const indirectReferral = downlines.filter((downline, id) => downline.level !== 1)
    const totaldirectPV = directReferral.reduce((accumulator, item) => {
        return accumulator + (item.pv || 0);
      }, 0);

      const totalIndirectReferralPV = indirectReferral.reduce((accumulator, item) => {
        return accumulator + (item.pv || 0);
      }, 0);

    return (
        <div className='portfolio-downlines'>
            <span className='flex items-center'>
                <img className='mr-2 mb-2' src={downlineIcon} alt='icon' />
                <span>{downlineCount} Downlines</span>
            </span>
            <span className="flex justify-between">
                <Statistic title="Direct Referral Bonus" value={totaldirectPV}/>
                <Statistic title="Indirect Referral Bonus" value={totalIndirectReferralPV} />
            </span>
        </div>
    )
}


export const RecentTransactions = ({transactions}) => {
const fewTrans = transactions.slice(-15)  
const modifiedTrans = fewTrans.map(transformTransaction);
    
    return (
        <>
            {modifiedTrans && modifiedTrans.map((transaction, id) => (
                <div key={id} className='flex justify-between items-center'>
                    <span className='flex flex-col mb-8'>
                        <span></span>
                        <span className='uppercase' style={{color: transaction.transactionType === 'fundTransfer' && 'red' }}>{transaction.transactionType}</span>
                        <span>{format(new Date(transaction.createdAt), 'yyyy-MM-dd hh:mm:ss a')}</span>
                    </span>
                    <span style={{color: transaction.transactionType === 'fundTransfer' && 'red' }}>
                        {transaction.amount}
                    </span>
                </div>
            ))}
        </>
    )
}

export const SearchBox = ({ value, onChange }) => {
    return (
        <span className='header-search'>
            <FaSearch />
            <input type="search" placeholder='search' value={value} onChange={onChange} />
        </span>
    )
}