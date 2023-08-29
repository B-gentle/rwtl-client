import { BsDot } from 'react-icons/bs';
import { format } from 'date-fns';
import React from 'react';

const Notifications = ({ notifications, readNotification }) => {
    const date = new Date()
    const todayDate = format(date, 'dd, MMM yyyy')
    const time = format(date, 'hh: mm a')
    return (
        <div>
            <section>
                {notifications && notifications.map((notification, index) =>
                    <div className='flex flex-col mb-[2rem]' key={index} onClick={readNotification}>
                        <section className='flex justify-between'>
                            <span className='font-[600] text-[1rem]'>{notification.title}</span>
                            <span><BsDot size={32} color='#FE4331' /></span>
                        </section>

                        <span className='text-[14px] text-[#3a3a3a] font-[400]'>{notification.message}</span>
                        <span className='text-[12px] text-[#3a3a3a] font-[400] '>{format(new Date(notification.createdAt), 'dd MMMM, yyyy')}</span>

                    </div>
                )}
            </section>
        </div>
    )
}

export default Notifications