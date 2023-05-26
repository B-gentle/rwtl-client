import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LOG_IN_USER, SET_USERDATA } from '../redux/features/user/userSlice';
import { message } from 'antd';
import { getLoggedinUser } from '../services/usersApiCall';

const ProtectedPage = ({ children }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const response = await getLoggedinUser()
      if (response.status === 200) {
        dispatch(SET_USERDATA(response.data.data));
      } else {
        const message =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message);
      }
    } catch (error) {
      message.error(error.message)
      localStorage.removeItem("token")
      navigate('/')
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")){
      getUser()
    }else{
      navigate('/')
    }
    
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedPage