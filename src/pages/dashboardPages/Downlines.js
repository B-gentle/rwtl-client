import React, { useState } from 'react'
import { message, Space, Table, Tag } from 'antd';
import SelectTableFilter from '../../components/SelectTableFilter';
import '../../components/layouts/layouts.scss';
import { useMediaQuery } from 'react-responsive';
import EmptyState from '../../components/EmptyState';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/features/user/userSlice';

const Downlines = () => {

  const user = useSelector(selectUserData)
  const downlines = user.downlines.map((downline, id) => {
    return {
      ...downline,
      package: downline.package?.name,
      key: downline._id
    }
  });
  const isMobile = useMediaQuery({ maxWidth: 980 })

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
      title: 'Commission ₦',
      key: 'comissionN',
      dataIndex: 'comissionN',
    },
    {
      title: 'Commission %',
      key: 'comissionPercent',
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

  const columnsMobile = [
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Successful copy
        message.success('Referral Link Copied!');
      })
      .catch(err => {
        // Handle errors here
        message.error('Error in copying text: ', err);
      });
  };

  const EmptyTable = () => {
    return (
      <>
        <EmptyState />
        <div className='empty-table'>
          <p>You currently do not have any downline. Invite your friends to earn referral bonus.</p>
          <div className='copy-link'>
                    <span id="referralLink">{user.referralLink}</span>
                    <span onClick={() => copyToClipboard(document.getElementById('referralLink').innerText)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>
        </div>
      </>
    )
  };

  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='downlines'>
      <h2>Downlines</h2>
      <SelectTableFilter data={data} filteredData={filteredData} searchValue={searchValue} setFilteredData={setFilteredData} setSearchValue={setSearchValue} />
      <div>

      </div>
      {data.length <= 0 ? <EmptyState text="You currently do not have any downline. Invite your friends to earn referral bonus." /> : <Table
        columns={isMobile ? columnsMobile : columns} dataSource={filteredData} locale={{ emptyText: <EmptyTable /> }} />}
    </div>
  )
}

export default Downlines