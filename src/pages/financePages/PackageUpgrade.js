import { Button, Form, Input, Select, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading'
import EmptyState from '../../components/EmptyState';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { selectUserData } from '../../redux/features/user/userSlice';
import { packagesUpgradeCall } from '../../services/apiCalls';
import { UpgradePackage } from '../../services/usersApiCall';

const PackageUpgrade = () => {

  const user = useSelector(selectUserData);
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { Option } = Select;
  const [packages, setPackages] = useState(null)

  // const userPackage = user?.package

  const handlePackageList = async () => {
    packagesUpgradeCall(setPackages, message);
  }

  const initialValues = {
    currrentPackage: user?.package.name,
    package: 'Select Package'
  }

  const onFinish = async (values) => {
    dispatch(SET_LOADING())
    try {
      const response = await UpgradePackage(values)
      if (response.status === 200) {
        dispatch(SET_SUCCESS())
        message.success('Upgrade Successful')
        form.resetFields();
      } else {
        const message =
          (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      dispatch(SET_ERROR())
      message.error(error.message)
    }
  }
  return (
    <div className='h-screen'>
      <BackArrowHeading title="Upgrade Package" link="settings" />

      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        form={form}
        layout='vertical'
        className='md:w-[50%] md:m-auto md:mt-[4rem]'

      >
        <Form.Item
          label="Current Package"
          name="currrentPackage"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Select Package"
          name="packageId"
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