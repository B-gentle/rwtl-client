import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR, SET_LOADING, SET_SUCCESS, selectLoading } from '../../../redux/features/processingStates/processStatesSlice';
import { LOG_IN_USER, LOG_OUT_USER, SET_USERDATA } from '../../../redux/features/user/userSlice';
import { DeleteUser, ViewUser, EditUserPI, EditUserBank, EditUserPassword, EnterUserAccount } from '../../../services/adminCalls'

const UsersDetails = ({ details, setDetails }) => {

    const [editPI, setEditPI] = useState(false)
    const [personalInformation, setPersonalInformation] = useState({
        fullname: details?.fullname,
        username: details?.username,
        email: details?.email,
        packageName: details?.package.name,
        walletBalance: details?.walletBalance,
        withdrawableCommission: details?.withdrawableCommission,
        commissionBalance: details?.commissionBalance,
        pv: details?.pv
    })

    const [bankDetails, setBankDetails] = useState({
        username: details?.username,
        accountNo: details?.accountNo,
        accountName: details?.accountName,
        bankName: details?.bankName,
    })

    const [newPassword, setNewPassword] = useState({
        username: details?.username,
        password: '*******'
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(selectLoading)

    const deleteUser = async () => {
        try {
            dispatch(SET_LOADING())
            const response = await DeleteUser({ userId: details._id })
            if (response.status === 200) {
                dispatch(SET_SUCCESS())
                message.success('User Deleted Successfully')
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

    const viewDownlineUser = async (username) => {
        try {
            const response = await ViewUser({ username })
            console.log(response)
            if (response.status === 200) {
                setDetails(response.data.data)
            } else {
                const message =
                    (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
                    response.message ||
                    response.toString();
                throw new Error(message)
            }

        } catch (error) {
            dispatch(SET_ERROR());
            message.error(error.message)
        }

    }

    const handlePersonalInformationChange = (e) => {
        const { name, value } = e.target;
        setPersonalInformation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setNewPassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitPersonalInformation = async (e) => {
        e.preventDefault()
        dispatch(SET_LOADING())
        try {
            const response = await EditUserPI(personalInformation)
            if (response.status === 200) {
                dispatch(SET_SUCCESS())
                message.success('user Details Updated')
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

    const submitBankDetails = async (e) => {
        e.preventDefault()
        dispatch(SET_LOADING())
        try {
            const response = await EditUserBank(bankDetails)
            if (response.status === 200) {
                dispatch(SET_SUCCESS())
                message.success('Bank Details Updated')
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

    const submitPassword = async (e) => {
        e.preventDefault()
        dispatch(SET_LOADING())
        try {
            const response = await EditUserPassword(newPassword)
            console.log(response)
            if (response.status === 200) {
                dispatch(SET_SUCCESS())
                message.success('Password changed')
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

    const userLogin = async () => {
        dispatch(SET_LOADING())
        try {
            const response = await EnterUserAccount({username: details.username})
            if (response.status === 200) {
                dispatch(LOG_IN_USER(true))
                dispatch(SET_SUCCESS());
                dispatch(SET_USERDATA(response.data.data));
                navigate('/dashboard');
                // message.success("user logged in successfully")
            } else {
                const message =
                    (response.data && response.data.message) || (response.response && response.response.data && response.response.data.message) ||
                    response.message ||
                    response.toString();
                throw new Error(message)
            }
        } catch (error) {
            dispatch(SET_ERROR())
            dispatch(LOG_OUT_USER(false));
            message.error(error.message)
        }
    }


    return (
        <div>
            <div>
                <div className='flex justify-between items-center'>
                    <h2>User Details</h2>
                    {/* <button>Block User</button> */}
                    <button onClick={deleteUser} className='bg-[red] text-white border-none rounded-[4px] p-[5px]'>Delete User</button>
                </div>
                <div className='mt-[1rem]'>
                    <p className='font-[500] text-[1.2rem] bg-[#F7EF8A] p-[1rem] text-[#3a3a3a99]'>Personal Information</p>
                    <div className='flex justify-between mt-[1.5rem]'>
                        <form onSubmit={submitPersonalInformation}>
                            <div className='flex flex-col md:flex-row gap-[1rem] md:gap-[1rem] md:flex-wrap'>
                                <div className='flex flex-col gap-[10px]'>
                                    <label>Fullname:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name='fullname' value={personalInformation.fullname} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>Username:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name='username' value={personalInformation.username} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>Email:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name='email' value={personalInformation.email} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>Package:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name="packageName" value={personalInformation.packageName} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>Wallet Balance:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="number" name='walletBalance' value={personalInformation.walletBalance} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>Withdrawable Commission:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="number" name='withdrawableCommission' value={personalInformation.withdrawableCommission} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>Total Commission:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="number" name='commissionBalance' value={personalInformation.commissionBalance} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>

                                <div className='flex flex-col gap-[10px]'>
                                    <label>PV:</label>
                                    <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="number" name="pv" value={personalInformation.pv} onChange={handlePersonalInformationChange} disabled={editPI ? false : true} />
                                </div>
                            </div>
                            <button className='rounded-[10px] border-none w-full mt-[1rem] p-[1rem] bg-[#A1967D] text-white'>{loading ? 'Loading...' : 'Save Changes'}</button>
                        </form>
                        <BiEdit size={23} onClick={() => { setEditPI(!editPI) }} />
                    </div>
                </div>

                <div className='mt-[1rem]'>
                    <p className='font-[500] text-[1.2rem] bg-[#F7EF8A] p-[1rem] text-[#3a3a3a99]'>Bank Details</p>
                    <div className='flex justify-between mt-[1rem]'>
                        <form onSubmit={submitBankDetails}>
                            <div className='flex flex-col gap-[10px]'>
                                <label>Bank Name:</label>
                                <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name="bankName" value={bankDetails.bankName} onChange={handleBankDetailsChange} disabled={editPI ? false : true} />
                            </div>
                            <div className='flex flex-col gap-[10px]'>
                                <label>Account Number:</label>
                                <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name="accountNo" value={bankDetails.accountNo} onChange={handleBankDetailsChange} disabled={editPI ? false : true} />
                            </div>
                            <div className='flex flex-col gap-[10px]'>
                                <label>Account Name:</label>
                                <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} type="text" name="accountName" value={bankDetails.accountName} onChange={handleBankDetailsChange} disabled={editPI ? false : true} />
                            </div>
                            <button className='rounded-[10px] border-none w-full mt-[1rem] p-[1rem] bg-[#A1967D] text-white'>{loading ? 'Loading...' : 'Save Changes'}</button>
                        </form>
                        <BiEdit size={23} onClick={() => { setEditPI(!editPI) }} />
                    </div>
                </div>

                <div className='mt-[1rem]'>
                    <p className='font-[500] text-[1.2rem] bg-[#F7EF8A] p-[1rem] text-[#3a3a3a99]'>Security</p>
                    <div className='flex justify-between mt-[1rem]'>
                        <form onSubmit={submitPassword}>
                            <div className='flex flex-col gap-[10px]'>
                                <label>Change Password</label>
                                <input className={!editPI ? 'border-none outline-none bg-[transparent]' : 'border border-[#9c8c94]'} name="password" type="text" value={newPassword.password} onChange={handlePasswordChange} disabled={editPI ? false : true} />
                            </div>
                            <button className='rounded-[10px] border-none w-full mt-[1rem] p-[1rem] bg-[#A1967D] text-white'>{loading ? 'Loading...' : 'Save Changes'}</button>
                        </form>
                        <BiEdit size={23} onClick={() => { setEditPI(!editPI) }} />
                    </div>
                </div>

                <div className='flex justify-center gap-[1rem] mt-[1rem]'>
                    <button onClick={userLogin} className='rounded-[10px] border-none p-[1rem] bg-[#E9DAA4] w-full'>{loading ? 'Requesting Acess...' : 'Access User Account'}</button>
                </div>


                <div className='mt-[1rem]'>
                    <p className='font-[500] text-[1.2rem] bg-[#F7EF8A] p-[1rem] text-[#3a3a3a99]'>Downlines</p>
                    <div>
                        <div className='flex flex-col md:flex-row md:gap-[1rem] md:flex-wrap'>
                            {details.downlines.map((_, id) =>
                                <div key={id}>
                                    <div className='mt-[10px] bg-[#D2AC47] p-[1rem] rounded-[4px] text-white'>
                                        <div className='text-[1.5rem] font-[600]'>Level {id + 1}</div>
                                        <div>
                                            {details.downlines
                                                .filter((downline) => downline.level === id + 1)
                                                .map((downline, id) =>
                                                (<div onClick={() => { viewDownlineUser(downline.username) }} key={id} className='flex flex-col mb-[1.5rem]'>
                                                    <span>Username: {downline.username}</span>
                                                    <span>Package: {downline.package.name}</span>
                                                    <span>PV: {downline.pv}PV</span>
                                                    <span>Level: {downline.level}</span>
                                                </div>))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersDetails