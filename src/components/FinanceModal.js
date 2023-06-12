import { Modal, Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import BackArrowHeading from './BackArrowHeading';
import TotalBalance from './TotalBalance';


export const MoreModal = ({ moreModalContent, activeSubContent, handleMoreItemClick, handleSubContentClick }) => {
    const [currentPage, setCurrentPage] = useState(null);

      const handleInitialView = () => {
          setCurrentPage(null);
      }

        if (currentPage === 'data') {
            return <MoreContentModal title="Buy Data" back={handleInitialView} />;
          } else if (currentPage === 'airtime') {
            return <MoreContentModal title="Buy Airtime" back={handleInitialView} />;
          } else if (currentPage === 'cable') {
            return <MoreContentModal title="Cable Subscription" back={handleInitialView} />;
          } else if (currentPage === 'electricity') {
            return <MoreContentModal title="Electricity Bills" back={handleInitialView} />;
          }else{
      
    return (
        <div>
            
        </div>

    )
          }
}



export const MoreContentModal = ({title, label, name, message, buttonText, back}) => {

    
      
    return(
        <div>
            <header><IoIosArrowRoundBack onClick={back} /><h1>{title}</h1></header>
            <TotalBalance />
  
);

export default App;
        </div>
    )
}























