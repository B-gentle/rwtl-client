import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
import SelectTableFilter from '../../components/SelectTableFilter';
import EmptyState from '../../components/EmptyState';
import '../../components/layouts/layouts.scss';
import { useMediaQuery } from 'react-responsive';

const Transactions = () => {

  const user = JSON.parse(localStorage.getItem("userData"))
  const downlines = user.downlines
  const isMobile = useMediaQuery({maxWidth: 980})

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Package',
      dataIndex: 'package.name',
      key: 'package.name',
    },
    
    {
      title: 'Commission ₦',
      key: 'commissionN',
      dataIndex: 'comissionN',
    },
    {
      title: 'Commission %',
      key: 'commissionPercent',
      dataIndex: 'comissionPercent',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: 'PV',
      dataIndex: 'pv',
      key: 'pv',
    },
    {
      title: 'Referral State',
      dataIndex: 'referralState',
      key: 'referralState',
      render: (_, record) => (
        <span>
          {record.level === 1 ? "Direct Referral" : "Indirect Referral"}
        </span>
      ),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
  ];

  const data = downlines

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