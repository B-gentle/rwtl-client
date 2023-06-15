import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import SelectTableFilter from '../../components/SelectTableFilter';
import EmptyState from '../../components/EmptyState';
import '../../components/layouts/layouts.scss';
import { useMediaQuery } from 'react-responsive';
import { getTransactions } from '../../services/transactionCalls';

const Transactions = () => {

  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(); // Replace with your actual API endpoint
        setTransactions(response.data.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [])
  
  
  const isMobile = useMediaQuery({maxWidth: 980})

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'username',
     
    },
    
  ];

  const data = transactions
  console.log(transactions)

  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='downlines'>
      <h2>Transactions</h2>
      <SelectTableFilter data={data} filteredData={filteredData} searchValue={searchValue} setFilteredData={setFilteredData} setSearchValue={setSearchValue} />
      <div>

      </div>
      {data.length <= 0 ? <EmptyState /> : <Table
      scroll={{
        x: isMobile && 1000,
        y: isMobile && 500,
      }}
       columns={columns} dataSource={filteredData} />}
    </div>
  )
}

export default Transactions