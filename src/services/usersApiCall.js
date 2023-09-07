import { apiCalls } from "./apiCalls";

export const RegisterUser = async(payload) =>  apiCalls('post', `/api/users/register`, payload)

export const AddDownline = async(payload) =>  apiCalls('post', `/api/users/adddownline`, payload)

export const checks = async(payload) =>  apiCalls('post', `/api/users/detailsValid`, payload)

export const LoginUser = async(payload) =>  apiCalls('post', `/api/users/login`, payload)

export const getFullName = async(payload) => apiCalls('post', '/api/users/get-full-name', payload)

export const generateStaticAccount = async(payload) => apiCalls('post', '/api/users/generate-static-account', payload)

export const changePassword = async(payload) =>  apiCalls('patch', `/api/users/changepassword`, payload)

export const CreatePin = async(payload) =>  apiCalls('patch', `/api/users/create-pin`, payload)

export const changePin = async(payload) =>  apiCalls('patch', `/api/users/change-pin`, payload)

export const updateUser = async(payload) => apiCalls('patch', `/api/users/updateuser`, payload)

export const UpgradePackage = async(payload) => apiCalls('patch', `/api/users/upgradepackage`, payload)

export const getLoggedinUser = async() =>  apiCalls('get', `/api/users/getuser`)

export const getLoggedinStatus = async() =>  apiCalls('get', `/api/users/loginstatus`)

export const logoutUser = async() => apiCalls('get', '/api/users/logout')

export const getNextIncentive = async() => apiCalls('get', '/api/users/getuserincentive')

export const getNotifications = async() => apiCalls('get', '/api/users/get-notifications')
