import { Button, Form, Input, Select, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading'
import EmptyState from '../../components/EmptyState';
import { selectLoading } from '../../redux/features/processingStates/processStatesSlice';
import { selectUserData } from '../../redux/features/user/userSlice';
import { packagesUpgradeCall } from '../../services/apiCalls';

const PackageUpgrade = () => {

const user = useSelector(selectUserData);
const loading = useSelector(selectLoading)
const dispatch = useDispatch()
const [form] = Form.useForm();
const { Option } = Select;
const [packages, setPackages] = useState(null)

const userPackage = user?.package

const handlePackageList = async () => {
  packagesUpgradeCall(setPackages, message);
}

const initialValues = {
    currrentPackage: user?.package.name,
    package: 'Select Package'
}

    const onFinish = async(values) => {

    }
  return (
    <div>
        <BackArrowHeading title="Upgrade Package" link="settings" />

        <Form
    onFinish={onFinish}
    initialValues={initialValues}
   
  >
    <Form.Item
      label="Current Package"
      name="currrentPackage"
    >
      <Input disabled />
    </Form.Item>

    <Form.Item
              label="Select Package"
              name="package"
            >
              <Select
                notFoundContent={<EmptyState />}
                onClick={handlePackageList}>
                {packages && packages
                 .map((option) => (
                  <Option key={option._id} value={option._id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

    

    <Form.Item
    >
      <Button type="primary" htmlType="submit" block loading={loading && true}>
        Upgrade
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default PackageUpgrade