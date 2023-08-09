import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import SelectTableFilter from '../../../components/SelectTableFilter';
import EmptyState from '../../../components/EmptyState';
import '../../../components/layouts/layouts.scss';
import { useMediaQuery } from 'react-responsive';
import { GET_TRANSACTIONS, selectTransaction } from '../../../redux/features/user/userSlice';
import { getTransactions, transformTransaction } from '../../../services/transactionCalls';
import { Link } from 'react-router-dom';

const Transactions = () => {

  const dispatch = useDispatch()

  useEffect(() => {
   window.scrollTo(0, 0)
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(); 
        dispatch(GET_TRANSACTIONS(response.data.data));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [])
  
  const transactions = useSelector(selectTransaction)
  const modifiedTrans = transactions.map(transformTransaction);

  const renderAction = (_, record) => (
    <div>
      <Link to={`/transactions/${record._id}`}>View</Link>
    </div>
  );

  const columns = [
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (text) => <span>{text.toUpperCase()}</span>
     
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
     
    },

    {
      title: 'View Details',
      key: 'action',
      render: renderAction,
    },
    
  ];

  const data = modifiedTrans
const transactionsFilterOptions = [
  {value: 'all', label: 'All'},
  {value: 'airtime', label: 'Airtime'},
  {value: 'data', label: 'Data'},
  {value: 'commission', label: 'Commission'},
  {value: 'Wallet to Wallet Transfer', label: 'Wallet Transfer'}
  
]
  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='downlines'>
      <h2>Transactions</h2>
      <SelectTableFilter 
      data={data} 
      filteredData={filteredData} 
      searchValue={searchValue} 
      setFilteredData={setFilteredData} 
      setSearchValue={setSearchValue}
      filterOptions={transactionsFilterOptions} 
      filterField='transactionType'/>
      <div>

      </div>
      {data.length <= 0 ? <EmptyState /> : <Table
      scroll={{
        x:true
      }}
       columns={columns} dataSource={filteredData} />}
    </div>
  )
}

export default Transactions