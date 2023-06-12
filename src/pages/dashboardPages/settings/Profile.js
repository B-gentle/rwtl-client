import { Button, Card, Form, Input, message } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import React from 'react';
import '../../../pages/authPages/auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import BackArrowHeading from '../../../components/BackArrowHeading';
import { updateUser } from '../../../services/usersApiCall';
import { selectLoading, SET_ERROR, SET_LOADING, SET_SUCCESS } from '../../../redux/features/processingStates/processStatesSlice';
import { selectUserData, SET_USERDATA } from '../../../redux/features/user/userSlice';
import ProfileBanner from './ProfileBanner';

const Profile = () => {

    const user = useSelector(selectUserData);
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();

    const initialValues = {
        fullname: user.fullname,
        eMail: user.email,
        usernaMe:  user.username
    }
    const onFinish = async (values) => {
        dispatch(SET_LOADING())
        try {
            const response = await updateUser(values);
            if (response.statusText === 'OK') {
                dispatch(SET_USERDATA(response.data.data));
                dispatch(SET_SUCCESS());
                message.success("Data updated Successfully");

            } else {
                const message =
                    (response.response && response.response.data && response.response.data.message) ||
                    response.message ||
                    response.toString();
                throw new Error(message)
            }
        } catch (error) {
            dispatch(SET_ERROR())
            message.error(error.message)
            console.log(error)
        }
    };

    return (
        <div className='my-profile'>
            <BackArrowHeading title="My Profile" link="settings" />
            <div className='flex mt-[32px] mb-[38px] justify-between items-center'>
                <ProfileBanner />
                <BiEditAlt size={22} />
            </div>
           <h1>Personal Information</h1>
            <Form
                className='mt-[16px]'
                onFinish={onFinish}
                layout='vertical'
                initialValues={initialValues}>
                <Form.Item
                    label="Full Name"
                    name="fullname"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email Address"
                    name="eMail"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="usernaMe"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Bank Name"
                    name="bankName"
                >
                    <Input placeholder='e.g UBA' />
                </Form.Item>
                <Form.Item
                    label="Account No"
                    name="accountNo"
                >
                    <Input placeholder='e.g 2060680907' />
                </Form.Item>
                <Form.Item
                    label="Account Name"
                    name="accountName"
                >
                    <Input placeholder='e.g Roy Kings' />
                </Form.Item>
                <Form.Item>
                    <Button className='auth-button' block type="primary" htmlType="submit" loading={loading && true} >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Profile