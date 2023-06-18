import { Button, message } from 'antd'
import React from 'react'
import { completeRegistration } from '../../services/adminCalls';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADING, SET_ERROR, SET_SUCCESS, selectLoading } from '../../redux/features/processingStates/processStatesSlice';

const PendingUserDetails = ({ user, setSelectedUser }) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading)
    const approveUser = async () => {
        dispatch(SET_LOADING())
        try {
            const response = await completeRegistration({ email: user?.email })
            if (response.status === 201) {
                dispatch(SET_SUCCESS());
                message.success("Registration Approved")
                setSelectedUser(null)
            } else {
                console.log(response)
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

    }
    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {user?.fullname}</p>
            <p>Email: {user?.email}</p>
            <p>Package: {user?.package}</p>
            <p>username: {user.username}</p>
            <div>
                <Button onClick={approveUser} loading={loading && true}>Approve</Button>
                <Button>Delete</Button>
            </div>
        </div>
    )
}

export default PendingUserDetails