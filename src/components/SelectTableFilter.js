import { Input, Select } from 'antd';
import React, { useState } from 'react'
import { SearchBox } from './DashbardComponents';

const SelectTableFilter = ({data, filteredData, searchValue, setFilteredData, setSearchValue }) => {
  
  const { Option } = Select;

  const handleFilterChange = (option) => {
    if (option === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        const referralState = item.level === 1 ? 'Direct Referral' : 'Indirect Referral';
        return referralState === option
      });
      setFilteredData(filtered);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    const filtered = data.filter(
      (item) => {
      const referralState = item.level === 1 ? 'Direct Referral' : 'Indirect Referral';
       return (  item.username.toLowerCase().includes(value.toLowerCase()) ||
         
         referralState.toString().includes(value)
     )});
     setFilteredData(filtered);
  };

  return (
    <div className='md:flex md:justify-between mb-[65px]'>
      <SearchBox
      value={searchValue}
      onChange={handleSearch}
      />


<span className='flex justify-between items-center'>
    <Select defaultValue="all" onChange={handleFilterChange} style={{width: '200px', padding: "16px"}}>
        <Option value="all">All</Option>
        <Option value="Indirect Referral">Indirect Referral</Option>
        <Option value="Direct Referral">Direct Referral</Option>
      </Select>

      <button>Download CSV</button>
      </span>
      </div>
       
  )
}

export default SelectTableFilter