import { Input, Select } from 'antd';
import React, { useState } from 'react'
import { SearchBox } from './DashbardComponents';

const SelectTableFilter = ({ data, filteredData, searchValue, setFilteredData, setSearchValue, filterOptions, }) => {

  const { Option } = Select;

  const handleFilterChange = (filterField, option) => {
    if (option.value === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        //  const referralState = item[filterField] === 1 ? 'Direct Referral' : 'Indirect Referral';
        // return item[filterField] === option.value;
        const referralState = item.level === 1 ? 'Direct Referral' : 'Indirect Referral';
        return referralState === option.value
      });
      console.log(filtered)
      setFilteredData(filtered);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    const filtered = data.filter(
      (item) => {
        const referralState = item.level === 1 ? 'Direct Referral' : 'Indirect Referral';
        return (item.username.toLowerCase().includes(value.toLowerCase()) || referralState.toString().includes(value)
        )
      });
    setFilteredData(filtered);
  };

  return (
    <div className='md:flex md:justify-between mb-[65px]'>
      <SearchBox
        value={searchValue}
        onChange={handleSearch}
      />


      <span className='flex mt-[1rem] justify-between items-center'>
        <Select defaultValue="all" onChange={handleFilterChange} style={{ width: '200px' }}>
         {filterOptions && filterOptions.map(option => 
          (
            <Option key={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </span>
    </div>

  )
}

export default SelectTableFilter