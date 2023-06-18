import { Button, Form, Input, Select } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading';
import TotalBalance from '../../components/TotalBalance';

const Cable = () => {
    const [form] = Form.useForm();
    const networkProvider = [
        {
            src: "",
            value: "",
            label: "Please "
        },
        {
            // src: MTN,
            value: "gotv",
            label: "GOTV",
        },
        {
            // src: GLO,
            value: "dstv",
            label: "DSTV",

        },
        {
            // src: airtel,
            value: "startimes",
            label: "STARTIMES",

        }
    ]
  return (
    <div>
        <BackArrowHeading title="Utility Bills" link="more" />
        <TotalBalance />
        <Form
                className='mb-[116px]'
                name="purchase"
                form={form}
                // onFinish={onFinish}
                layout="vertical"
                // initialValues={initialValue}
                
            >
                <Form.Item
                    label="Select Provider"
                    name="network"
                    rules={[{ required: true, message: 'Please Select Network!' }]}
                >

                    <Select
                        placeholder="Select Network"
                        style={{ width: '100%' }}
                        // onChange={handleDataCall}
                    >
                        {/* {networkProvider.map(option => (
                            <Option key={option.value} value={option.value}>
                                <Avatar src={option.src} />
                                {option.label}
                            </Option>
                        ))} */}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="IUC/SMART CARD NUMBER"
                    name="number"
                    rules={[{ required: true, message: "Please enter a phone number" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Select Package"
                    name="package"
                    rules={[{ required: true, message: 'Please Select a package!' }]}
                >

                    <Select
                        placeholder="Select Package"
                        style={{ width: '100%' }}
                        // disabled={dataPln && dataPln.length <= 0}
                        // onChange={handlePlanChange}

                    >
                        {/* {dataPln && dataPln.map((plan => (
                            <Option key={plan?.productCode} value={plan?.productCode}>
                                {plan.productName}
                            </Option>
                        )))
                        } */}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Please enter an Amount" }]}
                >
                    <Input placeholder='Amount'  disabled />
                    {/* value={selectedPlanAmount} */}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block >
                    {/* loading={loading && true} */}
                        Pay
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}

export default Cable