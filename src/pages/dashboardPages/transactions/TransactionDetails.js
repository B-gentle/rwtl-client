import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import BackArrowHeading from '../../../components/BackArrowHeading';
import { GET_TRANSACTIONS, selectTransaction, selectUserData } from '../../../redux/features/user/userSlice';
import { getTransactions, transformTransaction } from '../../../services/transactionCalls';

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
    const user = useSelector(selectUserData)
    const username = user.username
    const transactions = useSelector(selectTransaction)
    const transaction = transactions.find(
        (transaction) => transaction._id === id
    );

    const transformedTransaction = transaction ? transformTransaction(transaction) : null;


    if (!transaction) {
        return <div>Transaction not found</div>;
    }
    return (
        <div>
            <BackArrowHeading title="Transaction Details" link="dashboard" />
            <div className='space-y-4 mt-[1.5rem]'>

                <section className='flex justify-between items-center'>
                    <span>Transaction Type</span>
                    <span>{transaction.transactionType}</span>
                </section>

                <section className='flex justify-between items-center'>
                    <span className=''>Transction Amount</span>
                    <span className='text-right'>₦{transaction.amount}</span>
                </section>

                {(transaction.transactionType === 'data'
                    || transaction.transactionType === 'airtime')
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Network</span>
                        <span>{transformedTransaction.network}</span>
                    </section>)}

                {(transaction.transactionType === 'data'
                    || transaction.transactionType === 'airtime')
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Phone No</span>
                        <span>{transaction.phoneNumber}</span>
                    </section>)}

                {((transaction.transactionType === 'cableTv')
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>IUC/SMART CARD No</span>
                        <span>{transaction.IUC}</span>
                    </section>))}

                {((transaction.transactionType === 'electricity')
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Meter No</span>
                        <span>{transaction.meterNo}</span>
                    </section>))}

                {((transaction.transactionType === 'fundTransfer')
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Recipient:</span>
                        <span>{transaction.recipient}</span>
                    </section>))}

                {((transaction.transactionType === 'fundTransfer')
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Sender:</span>
                        <span>{transaction.sender}</span>
                    </section>))}


                {((transaction.transactionType === 'data')
                    || (transaction.transactionType === 'airtime')
                    || (transaction.transactionType === 'cableTv')
                    || (transaction.transactionType === 'electricity')
                    || (transaction.transactionType === 'upgrade'))
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Commission Earned</span>
                        <span>{transaction.commission}</span>
                    </section>)}

                {((transaction.transactionType === 'data')
                    || (transaction.transactionType === 'airtime')
                    || (transaction.transactionType === 'cableTv')
                    || (transaction.transactionType === 'electricity')
                    || (transaction.transactionType === 'upgrade'))
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>Previous Commission Balance</span>
                        <span>{(transaction.prevCommissionBalance).toFixed(2)}</span>
                    </section>
                    )}

                {((transaction.transactionType === 'data')
                    || (transaction.transactionType === 'airtime')
                    || (transaction.transactionType === 'cableTv')
                    || (transaction.transactionType === 'electricity')
                    || (transaction.transactionType === 'upgrade'))
                    &&
                    (<section className='flex justify-between items-center'>
                        <span>New Commission Balance</span>
                        <span>{(transaction.newCommissionBalance).toFixed(2)}</span>
                    </section>)}

                {(transaction.transactionType === 'fundTransfer' && transaction.recipient === username) && (<section className='flex justify-between items-center'>
                    <span>Previous Wallet Balanace</span>
                    <span>{transaction.receiverPrevWalletBalance}</span>
                </section>)}

                {(transaction.transactionType === 'fundTransfer' && transaction.recipient === username) && (<section className='flex justify-between items-center'>
                    <span>New Wallet Balance</span>
                    <span>{transaction.receiverNewWalletBalance}</span>
                </section>)}

                {(transaction.transactionType === 'fundTransfer' && transaction.sender === username)
                    &&
                    (
                        <section className='flex justify-between items-center'>
                            <span>Previous Wallet Balance</span>
                            <span>{transaction.senderPrevWalletBalance}</span>
                        </section>
                    )}

                {(transaction.transactionType === 'fundTransfer' && transaction.sender === username)
                    &&
                    (
                        <section className='flex justify-between items-center'>
                            <span>New Wallet Balanace</span>
                            <span>{transaction.senderNewWalletBalance}</span>
                        </section>
                    )}

                {(transaction.transactionType !== 'fundTransfer') && (<section className='flex justify-between items-center'>
                    <span>Previous Wallet Balanace</span>
                    <span>{transaction.prevWalletBalance}</span>
                </section>)
                }

                {(transaction.transactionType !== 'fundTransfer') && (<section className='flex justify-between items-center'>
                    <span>New Wallet Balanace</span>
                    <span>{transaction.newWalletBalance}</span>
                </section>
                )
                }

                <section className='flex justify-between items-center'>
                    <span>Time</span>
                    <span>{format(new Date(transaction.createdAt), 'hh:mm:ss a')}</span>
                </section>

                <section className='flex justify-between items-center'>
                    <span>Transaction Date</span>
                    <span>{format(new Date(transaction.createdAt), 'yyyy-MM-dd')}</span>
                </section>


            </div>

        </div>
    )
}

export default TransactionDetails