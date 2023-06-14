import React from 'react';
import ServiceCards from './ServiceCards';
import './services.scss';
import airtime from '../../../assets/images/Airtime_Data_service.png';
import utility from '../../../assets/images/billPaymentService.png';
import referral from '../../../assets/images/referral_service.png';

const Services = () => {
    return (
        <div className='services'>
            <h1>Products & Features</h1>
            <h3 className='bg-[green]'>The Services We Offer</h3>
            <p>RechargeWise simplifies routine financial tasks while unlocking income-generating opportunities.</p>
            <div className='service-card-container'>
                <ServiceCards
                icon={airtime}
                    heading="Airtime & Data Recharge"
                    text="RechargeWise rewards its users for every recharge they make through the platform. Whether it's topping up, data packages, airtime recharges. Users earns a percentage of the transaction value as a commission, which is added to their commission account balance." />
                <ServiceCards 
                icon={utility}
                heading="Bill Payment Portal" 
                text="RecharegeWise provides a comprehensive bill payment service. Users can conveniently settle their utility bills, including electricity, TV cables, and more, all within a single platform. Each bill payment transaction contributes to the user's commission earnings."/>
                <ServiceCards 
                icon={referral}
                heading="Referral Program"
                text="RechargeWise offers you an automated referral link that you can share with your family, friends, and social media contacts who use telecom services. By doing so, you can earn a commission directly or indirectly from the downlines referred by you." />
            </div>
        </div>
    )
}

export default Services