import { Avatar, Button, Form, Input, Select, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import MTN from '../../assets/images/MTN.svg';
import GLO from '../../assets/images/Glo.svg';
import airtel from '../../assets/images/airtel.svg';
import nineMobile from '../../assets/images/9mobile.svg';
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import { PurchaseData } from '../../services/transactionCalls'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import './financePages.scss';
import { getDataPlans } from '../../services/dataCalls';


const BuyData = () => {

    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    const [selectedPlanAmount, setSelectedPlanAmount] = useState(null);
    const [companyPrice, setCompanyPrice] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Option } = Select;

    const [form] = Form.useForm();
    const networkProvider = [
        {
            src: "",
            value: "",
            label: "Please "
        },
        {
            src: MTN,
            value: "01",
            label: "MTN",
        },
        {
            src: GLO,
            value: "02",
            label: "GLO",

        },
        {
            src: airtel,
            value: "04",
            label: "AIRTEL",

        },
        {
            src: nineMobile,
            value: "03",
            label: "9mobile",

        }]

    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        const { phoneNumber, amount } = values;
        if (phoneNumber.length < 11 || phoneNumber.length > 11) {
            dispatch(SET_ERROR());
            return message.error("Invalid Phone number")
        }

        try {
            const response = await PurchaseData(values);
           if(response.status === 200){
            dispatch(SET_SUCCESS());
            message.success("Data Purchased Successfully")
            form.resetFields();
           }else{
            const message =
            (response.data && response.data.message && response.data.message.message ) || (response.response && response.response.data && response.response.data.message) ||
            response.message ||
            response.toString();
          throw new Error(message)
           }
            
        } catch (error) {
            dispatch(SET_ERROR());
            message.error(error.message)
        }

    };

    const initialValue = {
        network: "Please Select a network",
        networkPlan: "Please Select a Plan",
        amount: companyPrice
    }

    const [dataPln, setDataPln] = useState()
    const handleDataCall = async (value) => {
        const response = await getDataPlans({networkCode: value})
        if (response.status === 200){
            setDataPln(response.data.data[0])
        }
    }

    const handlePlanChange = (value) => {
        const amount = dataPln.find((plan) => plan.PRODUCT_ID === value);
        setSelectedPlanAmount(Number(amount?.PRODUCT_AMOUNT) + 5);
        form.setFieldsValue({ amount: Number(amount?.PRODUCT_AMOUNT) + 5 });
      };


    return (
        <div className='buy-airtime'>
            <BackArrowHeading title="Buy Data" link="dashboard" />
            <TotalBalance />
            <Form
                className='mb-[116px]'
                name="purchase"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={initialValue}
                
            >
                <Form.Item
                    label="Select Provider"
                    name="network"
                    rules={[{ required: true, message: 'Please Select Network!' }]}
                >

                    <Select
                        placeholder="Select Network"
                        style={{ width: '100%' }}
                        onChange={handleDataCall}
                    >
                        {networkProvider.map(option => (
                            <Option key={option.value} value={option.value}>
                                <Avatar src={option.src} />
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please enter a phone number" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Select Package"
                    name="networkPlan"
                    rules={[{ required: true, message: 'Please Select a package!' }]}
                >

                    <Select
                        placeholder="Select Package"
                        style={{ width: '100%' }}
                        disabled={dataPln && dataPln.length <= 0}
                        onChange={handlePlanChange}

                    >
                        {dataPln && dataPln.map((plan => (
                            <Option key={plan?.PRODUCT_NAME} value={plan?.PRODUCT_ID}>
                                {plan.PRODUCT_NAME} for ₦{Number(plan.PRODUCT_AMOUNT) + 5}
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
                    <Input placeholder='Amount' value={selectedPlanAmount} disabled />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading && true}>
                        Buy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default BuyData