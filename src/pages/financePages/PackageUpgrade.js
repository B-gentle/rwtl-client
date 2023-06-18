import { Button, Form, Input } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading'
import { selectUserData } from '../../redux/features/user/userSlice';

const PackageUpgrade = () => {

const user = useSelector(selectUserData);
const userPackage = user?.package?.name

const initialValues = {
    currrentPackage: user?.package.name
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
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    

    <Form.Item
    >
      <Button type="primary" htmlType="submit" block>
        Upgrade
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default PackageUpgrade