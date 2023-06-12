import { apiCalls } from "./apiCalls";

export const RegisterUser = async(payload) =>  apiCalls('post', `/api/users/register`, payload)

export const LoginUser = async(payload) =>  apiCalls('post', `/api/users/login`, payload)

export const changePassword = async(payload) =>  apiCalls('patch', `/api/users/changepassword`, payload)

export const updateUser = async(payload) => apiCalls('patch', `/api/users/updateuser`, payload)

export const getLoggedinUser = async() =>  apiCalls('get', `/api/users/getuser`)

export const getLoggedinStatus = async() =>  apiCalls('get', `/api/users/loginstatus`)

export const logoutUser = async() => apiCalls('get', '/api/users/logout')
