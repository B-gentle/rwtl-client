import { Button, Form, Input, message, Select } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading';
import loader from '../../assets/images/loadingRings.gif';
import TotalBalance from '../../components/TotalBalance';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { getCable } from '../../services/dataCalls';
import { PayCable } from '../../services/transactionCalls';

const Cable = () => {
    const [form] = Form.useForm();
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedPlanAmount, setSelectedPlanAmount] = useState()
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()

    const { Option } = Select;

    const cableNetwork = [
        {
            src: "",
            value: "",
            label: "Please "
        },
        {
            value: "gotv",
            label: "GOTV",
        },
        {
            value: "dstv",
            label: "DSTV",

        },
        {
            value: "startimes",
            label: "STARTIMES",

        }
    ]

    const initialValues = {
        amount: selectedPlanAmount
    }

    const handleCableCall = async (value) => {
        dispatch(SET_LOADING());
        const response = await getCable({ cableNetwork: value })
        if (response.status === 200) {
            dispatch(SET_SUCCESS())
            setSelectedPlan(response.data[0])
        }
    }

    const handlePlanChange = (value) => {
        const amount = selectedPlan.find((plan) => plan?.PACKAGE_ID === value);
        setSelectedPlanAmount(amount?.PACKAGE_AMOUNT);
        form.setFieldsValue({ amount: amount?.PACKAGE_AMOUNT });
    }

    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        try {
            const response = await PayCable(values)
            if (response.status === 200) {
                dispatch(SET_SUCCESS())
                message.success('Bill Payed')
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
        <div className='buy-airtime'>
            <BackArrowHeading title="Utility Bills" link="dashboard" />
            <TotalBalance />
            <Form
                className='mb-[116px]'
                name="purchase"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={initialValues}

            >
                <Form.Item
                    label="Select Provider"
                    name="cableNetwork"
                    rules={[{ required: true, message: 'Please Select Cable Network!' }]}
                >

                    <Select
                        placeholder="Select Provider"
                        style={{ width: '100%' }}
                        onChange={handleCableCall}
                    >
                        {cableNetwork.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="IUC/SMART CARD NUMBER"
                    name="number"
                    rules={[{ required: true, message: "Please enter an IUC/SMART CARD number" }]}
                >
                    <Input />
                </Form.Item>

                {loading && 
                <div className='flex justify-center'>
                    <img className='w-[50px] h-[50px] rounded-[100px] text-center' src={loader} alt='' /></div>}

                <Form.Item
                    label="Select Package"
                    name="package"
                    rules={[{ required: true, message: 'Please Select a package!' }]}
                >

                    <Select
                        placeholder="Select Package"
                        style={{ width: '100%' }}
                        onChange={handlePlanChange}
                        disabled={selectedPlan === null}

                    >
                        {selectedPlan && selectedPlan.map((plan => (
                            <Option key={plan?.PACKAGE_ID
                            } value={plan?.PACKAGE_ID
                            }>
                                {plan.PACKAGE_NAME} for ₦{plan.PACKAGE_AMOUNT}
                            </Option>
                        )))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Please enter an Amount" }]}
                >
                    <Input placeholder='Amount' disabled />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" loading={loading && true} htmlType="submit" block >
                        Pay
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Cable