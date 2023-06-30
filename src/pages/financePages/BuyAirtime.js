import { Avatar, Button, Form, Input, Select, Modal, message } from 'antd'
import React, { useState } from 'react'
import MTN from '../../assets/images/MTN.svg';
import GLO from '../../assets/images/Glo.svg';
import airtel from '../../assets/images/airtel.svg';
import nineMobile from '../../assets/images/9mobile.svg';
import BackArrowHeading from '../../components/BackArrowHeading'
import TotalBalance from '../../components/TotalBalance'
import { buyAirtime } from '../../services/transactionCalls'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../redux/features/processingStates/processStatesSlice';
import './financePages.scss';


const BuyAirtime = () => {

    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState(null);
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
            label: "MTN"
        },
        {
            src: GLO,
            value: "02",
            label: "GLO"
        },
        {
            src: airtel,
            value: "04",
            label: "AIRTEL"
        },
        {
            src: nineMobile,
            value: "03",
            label: "9mobile"
        }]

        const [form] = Form.useForm();

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
            const response = await buyAirtime(values);
            console.log(response)
            if (response.status === 200) {
                dispatch(SET_SUCCESS())
                message.success(response.data.message)
                form.resetFields();
            } else {
                const message =
                (response.data && response.data.message ) || (response.response && response.response.data && response.response.data.message) ||
                response.message ||
                response.toString();
              throw new Error(message)
            }

        } catch (error) {
            dispatch(SET_ERROR());
            message.error(error.message)
        }

    };

    const onSelect = (option) => {
        setSelectedOption(option.label);
    }


    return (
        <div className='buy-airtime'>
            <BackArrowHeading title="Buy Airtime" link="dashboard" />
            <TotalBalance />

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
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Please enter an Amount" }]}
                >
                    <Input type="number" />
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

export default BuyAirtime