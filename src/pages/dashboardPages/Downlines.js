import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
import SelectTableFilter from '../../components/SelectTableFilter';
import EmptyAndSearch from '../../components/EmptyAndSearch';
import '../../components/layouts/layouts.scss';

const Downlines = () => {

  const user = JSON.parse(localStorage.getItem("userData"))
  const downlines = user.downlines

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
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

  const customLocale = {
    emptyText: "empty text"
    // <EmptyAndSearch referralLink="empty" text="empty" />, // Use your custom empty state component
  };

  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='downlines'>
      <h2>Downlines</h2>
      <SelectTableFilter data={data} filteredData={filteredData} searchValue={searchValue} setFilteredData={setFilteredData} setSearchValue={setSearchValue} />
      <div>

      </div>
      {data.length <= 0 ? <EmptyAndSearch /> : <Table columns={columns} dataSource={filteredData} />}
    </div>
  )
}

export default Downlines