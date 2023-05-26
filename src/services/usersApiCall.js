import { apiCalls } from "./apiCalls";
const URL = process.env.REACT_APP_SERVER_URL

export const RegisterUser = async(payload) => apiCalls('post', `${URL}/api/users/register`, payload)


export const LoginUser = async(payload) => apiCalls('post', `${URL}/api/users/login`, payload)

export const getLoggedinUser = async() => apiCalls('get', `${URL}/api/users/getuser`)
