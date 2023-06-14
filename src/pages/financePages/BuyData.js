import { Avatar, Button, Form, Input, Select, Modal, message } from 'antd'
import React, { useState } from 'react'
import MTN from '../../assets/images/MTN.svg';
import GLO from '../../assets/images/Glo.svg';
import airtel from '../../assets/images/airtel.svg';
import nineMobile from '../../assets/images/9mobile.svg';
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import { PurchaseAirtime } from '../../services/transactionCalls'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import './financePages.scss';


const BuyData = () => {

    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedPlanAmount, setSelectedPlanAmount] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Option } = Select;
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
            plans: [
                {name: "50 MB FOR 30 DAYS CORPORATE", amount: 20, value: "50.00" }
            ]
        },
        {
            src: GLO,
            value: "02",
            label: "GLO",
            plans: [
                {name: "50 MB FOR 30 DAYS CORPORATE", amount: 20, value: "50.00" }
            ]
        },
        {
            src: airtel,
            value: "04",
            label: "AIRTEL",
            plans: [
                {name: "50 MB FOR 30 DAYS CORPORATE", amount: 20, value: "50.00" }
            ]
        },
        {
            src: nineMobile,
            value: "03",
            label: "9mobile",
            plans: [
                {name: "50 MB FOR 30 DAYS CORPORATE", amount: 20, value: "50.00" }
            ]
        }]

// 500.0 for  @ N117.00
// 500.00 for 500 MB - 30 days (Corporate) @ N122.00
// 1000.0 for 1 GB - 30 days (SME) @ N230.00
// 1000.00 for 1 GB - 30 days (Corporate) @ N235.00
// 2000.0 for 2 GB - 30 days (SME) @ N460.00
// 2000.00 for 2 GB - 30 days (Corporate) @ N470.00
// 3000.0 for 3 GB - 30 days (SME) @ N690.00
// 3000.00 for 3 GB - 30 days (Corporate) @ N705.00
// 5000.0 for 5 GB - 30 days (SME) @ N1,150.00
// 5000.00 for 5 GB - 30 days (Corporate) @ N1,175.00
// 10000.0 for 10 GB - 30 days (SME) @ N2,300.00
// 10000.00 for 10 GB - 30 days (Corporate) @ N2,350.00
// 15000.00 for 15 GB - 30 days (Corporate) @ N3,460.00
// 25000.00 for 20 GB - 30 days (Corporate) @ N4,675.00
// 15000.00 for 25 GB - 30 days (Corporate) @ N5,850.00
// 100000.00 for 50 GB - 30 days (Corporate) @ N11,625.00
// 750.01 for 750 MB - 14 days (Direct) @ N482.50
// 1000.02 for 1 GB - 7 days (Direct) @ N482.50
// 1500.01 for 1.5 GB - 30 days (Direct) @ N965.00
// 3000.06 for 3 GB - 30 days (Direct) @ N1,447.50
// 4500.01 for 4.5 GB - 30 days (Direct) @ N1,930.00
// 6000.01 for 6 GB - 7 days (Direct) @ N1,447.50
// 6000.02 for 6 GB - 30 days (Direct) @ N2,412.50
// 8000.01 for 8 GB - 30 days (Direct) @ N2,895.00
// 10000.01 for 10 GB - 30 days (Direct) @ N3,377.50
// 15000.01 for 15 GB - 30 days (Direct) @ N4,825.00
// 20000.06 for 20 GB - 30 days (Direct) @ N5,790.00
// 40000.01 for 40 GB - 30 days (Direct) @ N9,650.00
// 75000.01 for 75 GB - 30 days (Direct) @ N14,475.00
// 110000.01 for 110 GB - 30 days (Direct) @ N19,300.00

// Available Data Plans For Glo
// 200 for 200 MB - 14 days (SME) @ N52.00
// 500 for 500 MB - 30 days (SME) @ N127.00
// 1000 for 1 GB - 30 days (SME) @ N250.00
// 2000 for 2 GB - 30 days (SME) @ N500.00
// 3000 for 3 GB - 30 days (SME) @ N750.00
// 5000 for 5 GB - 30 days (SME) @ N1,250.00
// 10000 for 10 GB - 30 days (SME) @ N2,500.00
// 105.01 for 105MB (Direct) @ N92.00
// 350.01 for 350MB (Direct) @ N184.00
// 1050.01 for 1.05GB/1.8GB (Direct) @ N460.00
// 2500.01 for 2.5GB/3.7GB (Direct) @ N920.00
// 5800.01 for 5.8GB/9.5GB (Direct) @ N1,840.00
// 7700.01 for 7.7GB/12.75GB (Direct) @ N2,300.00
// 10000.01 for 10GB/17GB (Direct) @ N2,760.00
// 13250.01 for 13.25GB/19GB (Direct) @ N3,680.00
// 18250.01 for 18.25/23GB (Direct) @ N4,600.00
// 29500.01 for 29.5GB/37GB (Direct) @ N7,360.00
// 50000.01 for 50GB/50GB (Direct) @ N9,200.00
// 93000.01 for 93GB/93GB (Direct) @ N13,800.00
// 119000.01 for 119GB/119GB (Direct) @ N16,560.00
// 138000.01 for 138GB/138GB (Direct) @ N18,400.00

// Available Data Plans For Airtel
// 100 for 100 MB - 7 days (SME) @ N25.00
// 300 for 300 MB - 7 days (SME) @ N71.00
// 500 for 500 MB - 30 days (SME) @ N117.00
// 1000 for 1 GB - 30 days (SME) @ N225.00
// 2000 for 2 GB - 30 days (SME) @ N450.00
// 5000 for 5 GB - 30 days (SME) @ N1,125.00
// 10000 for 10 GB - 30 days (SME) @ N2,250.00
// 15000 for 15 GB - 30 days (SME) @ N3,375.00
// 20000 for 20 GB - 30 days (SME) @ N4,500.00
// 99.00 for 100 MB - 1 day (Direct) @ N95.54
// 199.03 for 200 MB - 3 days (Direct) @ N192.06
// 299.02 for 350 MB - 7 days (Direct) @ N288.55
// 499.00 for 750 MB - 14 days (Direct) @ N481.54
// 299.03 for 1 GB - 1 day (Direct) @ N288.56
// 999.00 for 1.5 GB - 30 days (Direct) @ N964.04
// 499.03 for 2 GB - 1 day (Direct) @ N481.56
// 1199.00 for 2 GB - 30 days (Direct) @ N1,157.04
// 1499.01 for 3 GB - 30 days (Direct) @ N1,446.54
// 1999.00 for 4.5 GB - 30 days (Direct) @ N1,929.04
// 1499.03 for 6 GB - 7 days (Direct) @ N1,446.56
// 2499.01 for 6 GB - 30 days (Direct) @ N2,411.54
// 2999.02 for 8 GB - 30 days (Direct) @ N2,894.05
// 3999.01 for 11 GB - 30 days (Direct) @ N3,859.04
// 4999.00 for 15 GB - 30 days (Direct) @ N4,824.04
// 9999.00 for 40 GB - 30 days (Direct) @ N9,649.04
// 14999.00 for 75 GB - 30 days (Direct) @ N14,474.04
// 19999.02 for 110 GB - 30 days (Direct) @ N19,299.05

// Available Data Plans For 9mobile
// 50 for 50 MB - 30 days (SME) @ N10.00
// 100 for 100 MB - 30 days (SME) @ N18.00
// 300 for 300 MB - 30 days (SME) @ N50.00
// 500 for 500 MB - 30 days (SME) @ N77.00
// 1000 for 1 GB - 30 days (SME) @ N145.00
// 2000 for 2 GB - 30 days (SME) @ N290.00
// 3000 for 3 GB - 30 days (SME) @ N435.00
// 4000 for 4 GB - 30 days (SME) @ N580.00
// 5000 for 5 GB - 30 days (SME) @ N725.00
// 10000 for 10 GB - 30 days (SME) @ N1,450.00
// 15000 for 15 GB - 30 days (SME) @ N2,175.00
// 20000 for 20 GB - 30 days (SME) @ N2,900.00
// 25000 for 25 GB - 30 days (SME) @ N3,625.00
// 500.01 for 500 MB - 30 days (Direct) @ N467.50
// 1500.01 for 1.5 GB - 30 days (Direct) @ N935.00
// 2000.01 for 2 GB - 30 days (Direct) @ N1,122.00
// 4500.01 for 4.5 GB - 30 days (Direct) @ N1,870.00
// 3000.01 for 7 GB - 7 days (Direct) @ N1,402.50
// 11000.01 for 11 GB - 30 days (Direct) @ N3,740.00
// 15000.01 for 15 GB - 30 days (Direct) @ N4,675.00
// 40000.01 for 40 GB - 30 days (Direct) @ N9,350.00
// 75000.01 for 75 GB - 30 days (Direct) @ N14,025.00

    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        const { phoneNumber, amount } = values;
        if (phoneNumber.length < 11 || phoneNumber.length > 11) {
            dispatch(SET_ERROR());
            return message.error("Invalid Phone number")
        }

        if (amount < 50) {
            dispatch(SET_ERROR())
            return message.error("All recharges are from N50 and Above")
        }

        try {
            const response = await PurchaseAirtime(values);
            console.log(response)
            dispatch(SET_SUCCESS())
        } catch (error) {
            dispatch(SET_ERROR());
            console.log(error)
        }

    };

    const onSelect = (option) => {
        setSelectedOption(option.label);
    }


    return (
        <div className='buy-airtime'>
            <BackArrowHeading title="Buy Data" link="more" />
            <TotalBalance />run build
            <Form
                className='mb-[116px]'
                name="purchase"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Select Provider"
                    name="network"
                    rules={[{ required: true, message: 'Please Select Network!' }]}
                >

                    <Select
                        placeholder="Select Network"
                        style={{ width: '100%' }}
                        defaultValue="Select a Network"
                        onSelect={setSelectedOption}
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
                    rules={[{ required: true, message: 'Please Select Network!' }]}
                >

                    <Select
                        placeholder="Select Package"
                        style={{ width: '100%' }}
                        defaultValue="Select a Network"
                        onChange={(value) => {
                            const network = networkProvider.find((network) => network.value === selectedOption);
                            const plan = network.plans.find((plan) => plan.name === value)
                            setSelectedPlanAmount(plan.amount)
                        }

                    }
                    >
                        {selectedOption && networkProvider.find(network => network.name === selectedOption).plans.map((option) => (
                            <Option key={option.value} value={option.value}>
                                <Avatar src={option.src} />
                                {option.label}
                            </Option>
                        ))}
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