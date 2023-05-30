import { Card, Modal, Statistic } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectUserData } from '../../redux/features/user/userSlice';
import sendIcon from '../../assets/icons/dashboard_icons/send.svg';
import withdrawIcon from '../../assets/icons/dashboard_icons/withdraw.svg';
import topUpIcon from '../../assets/icons/dashboard_icons/top-up.svg';
import moreIcon from '../../assets/icons/dashboard_icons/more.svg';
import downlineIcon from '../../assets/icons/dashboard_icons/downline-card-icon.svg';
import pvIcon from '../../assets/icons/dashboard_icons/pv-icon.svg';
import { Chart, FinancialCards, IncentiveProgress, RecentTransactions } from '../../components/DashbardComponents';
import { format } from 'date-fns';
import Welcome from '../../components/Welcome';
import FinanceModal, { MoreModal, SendModal, TopUpModal, WithdrawModal } from '../../components/FinanceModal';

const Dashboard = () => {
    const user = useSelector(selectUserData)
    const date = new Date()
    const todayDate = format(date, 'dd, MMM yyyy')
    const time = format(date, 'hh: mm a')
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [moreModalContent, setMoreModalContent] = useState(null);

    const handleCardClick = (content) => {
        if (content === 'more') {
            setOpenModal(true);
            setModalContent(content);
            setMoreModalContent(null);
        }else{
        setOpenModal(true);
        setModalContent(content)
        }
    };

    const handleOk = () => {
        setOpenModal(false);
        setModalContent(null)
    };

    const handleCancel = () => {
        setOpenModal(false);
        setModalContent(null)
    };

    return (
        <div className='dashboard'>
            {isMobile ? null : <Welcome user={user} />}
            <div className='flex flex-col md:flex-row'>
                <Card className='card finance-card'>
                    <div className="flex justify-between balance-card">
                        <span>Total balance<br /><span>Amount</span></span>
                        <span className='flex text-right'>{todayDate}<br />{time}</span>
                    </div>
                    <div className='flex financial-cards-container'>
                        <FinancialCards text="Send" icon={sendIcon} showModal={() => { handleCardClick("send") }} content="send" />
                        <FinancialCards text="Withdraw" icon={withdrawIcon} showModal={() => { handleCardClick("withdraw") }} />
                        <FinancialCards text="Top Up" icon={topUpIcon} showModal={() => { handleCardClick("top-up") }} />
                        <FinancialCards text="More" icon={moreIcon} showModal={() => { handleCardClick("more") }} />
                    </div>
                    <Modal open={openModal} onOk={handleOk} onCancel={handleCancel}>
                        {modalContent === "send" && <SendModal />}
                        {modalContent === "withdraw" && <WithdrawModal />}
                        {modalContent === "top-up" && <TopUpModal />}
                        {modalContent === "more" && <MoreModal />}
                        
                    </Modal>
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