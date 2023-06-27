import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackArrowHeading from '../../../components/BackArrowHeading';
import { GET_TRANSACTIONS, selectTransaction } from '../../../redux/features/user/userSlice';
import { getTransactions } from '../../../services/transactionCalls';

const TransactionDetails = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions(); // Replace with your actual API endpoint
                dispatch(GET_TRANSACTIONS(response.data.data));
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [])

    const { id } = useParams();
    const transactions = useSelector(selectTransaction)
    const transaction = transactions.find(
        (transaction) => parseInt(transaction._id) === parseInt(id)
    );


    if (!transaction) {
        return <div>Transaction not found</div>;
    }
    return (
        <div>
            <BackArrowHeading title="Transaction Details" link="dashboard" />
            <div className='space-y-4 mt-[1.5rem]'>
                <section className='flex justify-between items-center'>
                    <span className=''>Transction Amount</span>
                    <span className='text-right'>₦{transaction.amount}</span>
                </section>
                <section className='flex justify-between items-center'>
                    <span>Transaction Type</span>
                    <span>{transaction.transactionType}</span>
                </section>

                {((transaction.transactionType === 'data')
                    || (transaction.transactionType === 'airtime')
                    || (transaction.transactionType === 'cableTv')
                    || (transaction.transactionType === 'electricity'))
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Commission Earned</span>
                        <span>{transaction.commission}</span>
                    </section>)}

                {((transaction.transactionType === 'data')
                    || (transaction.transactionType === 'airtime')
                    || (transaction.transactionType === 'cableTv')
                    || (transaction.transactionType === 'electricity'))
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Previous Commission Balance</span>
                        <span>{transaction.prevcommissionBalance}</span>
                    </section>
                    )}

                {((transaction.transactionType === 'data')
                    || (transaction.transactionType === 'airtime')
                    || (transaction.transactionType === 'cableTv')
                    || (transaction.transactionType === 'electricity')
                    || (transaction.transactionType === 'upgrade'))
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Previous Commission Balance</span>
                        <span>{transaction.newcommissionBalance}</span>
                    </section>)}

                <section className='flex justify-between items-center'>
                    <span>Previous Wallet Balanace</span>
                    <span>{transaction.prevWalletBalance}</span>
                </section>

                <section className='flex justify-between items-center'>
                    <span>New Wallet Balanace</span>
                    <span>{transaction.newWalletBalance}</span>
                </section>

            </div>

        </div>
    )
}

export default TransactionDetails