import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_USER, selectIsLoggedIn, selectUserData, SET_USERDATA } from '../../redux/features/user/userSlice';
import { message } from 'antd';
import { getLoggedinStatus } from '../../services/adminCalls';
import { getLoggedinAdmin } from '../../services/adminCalls';

const ProtectAdmin = ({ children }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(selectUserData)


  const authenticateAdmin = async () => {
    try {
      const loginStatus = await getLoggedinStatus();
      if(loginStatus.data){
        const response = await getLoggedinAdmin();
        if (response.status === 200) {
          dispatch(LOG_IN_USER(true));
          dispatch(SET_USERDATA(response.data.data));
        } else {
          const message =
            (response.response && response.response.data && response.response.data.message) ||
            response.message ||
            response.toString();
          throw new Error(message);
          navigate('/super')
        }
      }else{
        navigate('/super')
      }
     
    } catch (error) {
      message.error(error.message)
      localStorage.removeItem("token")
      navigate('/super')
    }
  }
  useEffect(() => {
   authenticateAdmin()
  }, [])
  
    return (
      <div>
        {admin && children}
      </div>
    )
  
}

export default ProtectAdmin