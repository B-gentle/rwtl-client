import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import SelectTableFilter from '../../components/SelectTableFilter';
import EmptyState from '../../components/EmptyState';
import '../../components/layouts/layouts.scss';
import { useMediaQuery } from 'react-responsive';
import { selectTransaction } from '../../redux/features/user/userSlice';

const Transactions = () => {

  useEffect(() => {
   window.scrollTo(0, 0)
  }, [])
  
  const transactions = useSelector(selectTransaction)
  const isMobile = useMediaQuery({maxWidth: 980})

  const columns = [
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
     
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
     
    },
    
  ];

  const data = transactions

  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='downlines'>
      <h2>Transactions</h2>
      <SelectTableFilter data={data} filteredData={filteredData} searchValue={searchValue} setFilteredData={setFilteredData} setSearchValue={setSearchValue} />
      <div>

      </div>
      {data.length <= 0 ? <EmptyState /> : <Table
      // scroll={{
      //   x: isMobile && 1000,
      //   y: isMobile && 500,
      // }}
       columns={columns} dataSource={filteredData} />}
    </div>
  )
}

export default Transactions