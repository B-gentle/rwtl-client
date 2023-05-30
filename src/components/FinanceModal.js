import { Modal } from 'antd'
import React from 'react';
import { FaAngleRight } from 'react-icons/fa'

export const SendModal = () => {
    return (
        <div>
            Send
        </div>
    )
}

export const WithdrawModal = () => {
    return (
        <div>
            Send
        </div>
    )
}

export const TopUpModal = ({ handleOk, handleCancel, title, stateName }) => {
    return (
        <div>
            More
        </div>

    )
}

export const MoreModal = ({ handleOk, handleCancel, title, stateName }) => {
    return (
        <div>
            <h1>More</h1>
            <p className='flex justify-between mb-3'>
                <span>Data</span>
                <FaAngleRight />
            </p>
            <p className='flex justify-between mb-3'>
                <span>Airtime</span>
                <FaAngleRight />
            </p>
            <p className='flex justify-between mb-3'>
                <span>Cable</span>
                <FaAngleRight />
            </p>
            <p className='flex justify-between mb-3'>
                <span>Electricity</span>
                <FaAngleRight />
            </p>
        </div>

    )
}



