import { Progress } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import React from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const FinancialCards = ({ icon, text, alt, showModal }) => {
    return (
        <div className='financialCards flex flex-col' onClick={showModal}>
            <img src={icon} alt={alt} />
            <span>{text}</span>
        </div>
    )
}

export const IncentiveProgress = ({ title, value, progress }) => {
    return (
        <div>
            <h3>{title}</h3>
            <Progress percent={progress} />
            <small>{value}</small>
        </div>
    );
};

export const Chart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [5, 10, 50, 20, 90, 100, 220],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return value + 'k';
                    }
                }
            },
        },
    };

    return (
        <div style={{ height: 200 }}>
            <h2>Income Overview</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export const RecentTransactions = () => {
    const date = new Date()
    const transanctionDate = format(date, 'yyyy-MM-dd hh:mm a')
    const data = [{
        transanctionType: 'Recharge - MTN',
        transanctionDate,
        amount: "N10,0000"
    }, {
        transanctionType: 'Data - Glo',
        transanctionDate,
        amount: "N10,0000"
    }, {
        transanctionType: 'Deposit',
        transanctionDate,
        amount: "N10,0000"
    }]
    return (
        <>
            {data && data.map((transanction, id) => (
                <div key={id} className='flex justify-between items-center'>
                    <span className='flex flex-col mb-8'>
                        <span></span>
                        <span>{transanction.transanctionType}</span>
                        <span>{transanction.transanctionDate}</span>
                    </span>
                    <span>
                        {transanction.amount}
                    </span>
                </div>
            ))}
        </>
    )
}

export const SearchBox = ({value, onChange}) => {
    return (
      <span className='header-search'>
      <FaSearch />
      <input type="search" placeholder='search' value={value} onChange={onChange} />
    </span>
    )
  }