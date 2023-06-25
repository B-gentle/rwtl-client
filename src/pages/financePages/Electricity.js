import React, { useState } from 'react'
import { Button, Form, Input, message, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../components/BackArrowHeading';
import TotalBalance from '../../components/TotalBalance';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import { ElectricityBill } from '../../services/transactionCalls';

const Electricity = () => {

    const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector(selectLoading)
  const { Option } = Select;

  const onFinish = async(values) => {
    dispatch(SET_LOADING())
    try {
        const response = await ElectricityBill(values)
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
            <BackArrowHeading title="Electricity Bills" link="more" />
            <TotalBalance />
            <Form
                className='mb-[116px]'
                name="purchase"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                // initialValues={initialValues}

            >
                <Form.Item
                    label="Electricity Company"
                    name="ElectricCompany"
                    rules={[{ required: true, message: 'Please Select Electric Company!' }]}
                >

                    <Select
                        placeholder="Select Company"
                        style={{ width: '100%' }}
                       >
                         <Option>Select</Option>
                         <Option value="01">Eko Electric - EKEDC</Option>
                         <Option value="02">Ikeja Electric - IKEDC</Option>
                         <Option value="03">Abuja Electric - AEDC</Option>
                         <Option value="04">Kano Electric - KEDC</Option>
                         <Option value="05">Porthacourt Electric - PHEDC</Option>
                         <Option value="06">Jos Electric - JEDC</Option>
                         <Option value="07">Ibadan Electric - IBEDC</Option>
                         <Option value="08">Kaduna Elecdtric - KAEDC</Option>
                         <Option value="09">Enugu Electric - EEDC</Option>
                         <Option value="10">Benin Electric - BEDC</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Meter Type"
                    name="MeterType"
                    rules={[{ required: true, message: 'Please Select Meter Type!' }]}
                >

                    <Select
                        placeholder="Select meter type"
                        style={{ width: '100%' }}
                        // onChange={handleCableCall}
                    >
                      <Option>Select</Option>
                       <Option value="01">Prepaid</Option>
                       <Option value="02">Postpaid</Option>
                    </Select>
                </Form.Item>
               

                <Form.Item
                    label="METER NUMBER"
                    name="MeterNo"
                    rules={[{ required: true, message: "Please enter a meter number" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Please enter an Amount" }]}
                >
                    <Input type="number" placeholder='Amount' />
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

export default Electricity


    // const [selectedPlan, setSelectedPlan] = useState(null)
    // const [selectedPlanAmount, setSelectedPlanAmount] = useState()
    
    // const dispatch = useDispatch()

    // const cableNetwork = [
    //     {
    //         src: "",
    //         value: "",
    //         label: "Please "
    //     },
    //     {
    //         value: "gotv",
    //         label: "GOTV",
    //     },
    //     {
    //         value: "dstv",
    //         label: "DSTV",

    //     },
    //     {
    //         value: "startimes",
    //         label: "STARTIMES",

    //     }
    // ]

    // const initialValues = {
    //     amount: selectedPlanAmount
    // }

    // const handleCableCall = async (value) => {
    //     const response = await getCable({ cableNetwork: value })
    //     if (response.status === 200) {
    //         setSelectedPlan(response.data.data[0])
    //         console.log(selectedPlan)
    //     }
    // }

    // const handlePlanChange = (value) => {
    //     const amount = selectedPlan.find((plan) => plan?.PACKAGE_ID === value);
    //     setSelectedPlanAmount(amount?.PACKAGE_AMOUNT);
    //     form.setFieldsValue({ amount: amount?.PACKAGE_AMOUNT });
    // }

    // const onFinish = async (values) => {
    //     dispatch(SET_LOADING())
    //     try {
    //         const response = await PayCable(values)
    //         if (response.status === 200) {
    //             message.success('Bill Payed')
    //         } else {
    //             const message =
    //                 (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
    //                 response.message ||
    //                 response.toString();
    //             throw new Error(message)
    //         }
    //         dispatch(SET_SUCCESS())
    //     } catch (error) {
    //         dispatch(SET_ERROR())
    //         message.error(error.message)
    //     }
    // }