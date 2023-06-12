import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_USER, selectIsLoggedIn, selectUserData, SET_USERDATA } from '../redux/features/user/userSlice';
import { message } from 'antd';
import { getLoggedinStatus, getLoggedinUser } from '../services/usersApiCall';

const ProtectedPage = ({ children }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData)


  const authenticateUser = async () => {
    try {
      const loginStatus = await getLoggedinStatus();
      if(loginStatus.data){
        const response = await getLoggedinUser();
        if (response.status === 200) {
          dispatch(LOG_IN_USER(true));
          dispatch(SET_USERDATA(response.data.data));
        } else {
          const message =
            (response.response && response.response.data && response.response.data.message) ||
            response.message ||
            response.toString();
          throw new Error(message);
          navigate('/login')
        }
      }else{
        navigate('/login')
      }
     
    } catch (error) {
      message.error(error.message)
      localStorage.removeItem("token")
      navigate('/login')
    }
  }
  useEffect(() => {
   authenticateUser()
  }, [])
  
    return (
      <div>
        {user && children}
      </div>
    )
  
}

export default ProtectedPage