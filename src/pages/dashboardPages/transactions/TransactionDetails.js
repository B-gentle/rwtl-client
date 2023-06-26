import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
<span>{transaction.transactionType}</span>
    </div>
  )
}

export default TransactionDetails